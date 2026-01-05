import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { env } from "~/env";
import { auth } from "~/server/auth";
import { v4 as uuidv4 } from "uuid";
import { db } from "~/server/db";
import { processVideo } from "~/actions/generation";

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

    // Read file as buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Setup S3 client
    const s3Client = new S3Client({
      region: env.AWS_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    });

    // Generate unique key
    const fileExtension = file.name.split(".").pop() ?? "";
    const uniqueId = uuidv4();
    const key = `${uniqueId}/original.${fileExtension}`;

    // Upload to S3
    const command = new PutObjectCommand({
      Bucket: env.S3_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    });

    await s3Client.send(command);

    // Create database record with uploaded: false so processVideo will trigger
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

    // Trigger video processing
    await processVideo(uploadedFileDbRecord.id);

    return NextResponse.json({
      success: true,
      uploadedFileId: uploadedFileDbRecord.id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
