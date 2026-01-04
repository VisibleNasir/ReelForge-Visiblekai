import { NextRequest, NextResponse } from "next/server";
import { env } from "~/env";
import { db } from "~/server/db";

/**
 * TEST ENDPOINT - Simulates Modal sending generated clips back
 * 
 * For testing only - sends sample clips to the webhook
 * 
 * Usage: POST http://localhost:3000/api/test/generate-clips
 * Body: {
 *   "uploaded_file_id": "...",
 *   "user_id": "..."
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { uploaded_file_id, user_id } = body;

    if (!uploaded_file_id || !user_id) {
      return NextResponse.json(
        { error: "Missing uploaded_file_id or user_id" },
        { status: 400 }
      );
    }

    // Verify the uploaded file exists and belongs to the user
    const uploadedFile = await db.uploadedFile.findFirst({
      where: {
        id: uploaded_file_id,
        userId: user_id,
      },
    });

    if (!uploadedFile) {
      return NextResponse.json(
        { error: "Uploaded file not found or doesn't belong to user" },
        { status: 404 }
      );
    }

    // Generate fake clips (in reality, Modal would create these)
    const fakeClips = [
      {
        s3Key: `${uploadedFile.s3Key.replace('/original.mp4', '')}/clip-1.mp4`,
      },
      {
        s3Key: `${uploadedFile.s3Key.replace('/original.mp4', '')}/clip-2.mp4`,
      },
      {
        s3Key: `${uploadedFile.s3Key.replace('/original.mp4', '')}/clip-3.mp4`,
      },
    ];

    // Call the webhook to save clips
    const webhookUrl = `${env.BASE_URL}/api/webhook/modal`;
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${env.PROCESS_VIDEO_ENDPOINT_AUTH}`,
      },
      body: JSON.stringify({
        uploaded_file_id,
        user_id,
        status: "completed",
        clips: fakeClips,
      }),
    });

    const result = await response.json();

    return NextResponse.json({
      success: true,
      message: "Test clips generated successfully",
      clips: fakeClips,
      webhookResponse: result,
    });
  } catch (error) {
    console.error("Test generate clips error:", error);
    return NextResponse.json(
      { error: "Failed to generate test clips" },
      { status: 500 }
    );
  }
}
