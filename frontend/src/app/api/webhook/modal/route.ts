import { NextRequest, NextResponse } from "next/server";
import { env } from "~/env";
import { db } from "~/server/db";

export async function POST(request: NextRequest) {
  try {
    // Verify authorization header
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${env.PROCESS_VIDEO_ENDPOINT_AUTH}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { uploaded_file_id, user_id, clips, status } = body;

    if (!uploaded_file_id || !user_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Update the uploaded file status
    await db.uploadedFile.update({
      where: { id: uploaded_file_id },
      data: {
        status: status ?? "completed",
        uploaded: true,
      },
    });

    // Save clips if provided
    if (clips && Array.isArray(clips)) {
      await db.clip.createMany({
        data: clips.map((clip: { s3_key: string }) => ({
          s3Key: clip.s3_key,
          uploadedFileId: uploaded_file_id,
          userId: user_id,
        })),
      });
    }

    return NextResponse.json({ success: true, clips_created: clips?.length ?? 0 });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
