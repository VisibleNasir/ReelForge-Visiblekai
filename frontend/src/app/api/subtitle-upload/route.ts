import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { env } from "~/env";
import { auth } from "~/server/auth";
import { v4 as uuidv4 } from "uuid";
import { db } from "~/server/db";
import { burnSubtitles } from "~/actions/subtitle";

// Increase request timeout and body size for large file uploads
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const s3Client = new S3Client({
      region: env.AWS_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const fileExtension = file.name.split(".").pop() ?? "";
    const uniqueId = uuidv4();
    const key = `${uniqueId}/subtitle.${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: env.S3_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    });

    await s3Client.send(command);

    const uploadedFileDbRecord = await db.uploadedFile.create({
      data: {
        userId: session.user.id,
        s3Key: key,
        displayName: file.name,
        uploaded: false,
        status: "uploading",
      },
      select: {
        id: true,
      },
    });

    console.log("Starting subtitle burn for file:", uploadedFileDbRecord.id);
    const burnResult = await burnSubtitles(uploadedFileDbRecord.id);
    console.log("Burn result:", burnResult);

    if (!burnResult.success) {
      console.error("Burn failed:", burnResult.error);
      return NextResponse.json(
        { error: burnResult.error || "Subtitle burn failed" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      uploadedFileId: uploadedFileDbRecord.id,
    });
  } catch (error) {
    console.error("Subtitle upload error:", error);
    return NextResponse.json(
      { error: "Subtitle upload failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
