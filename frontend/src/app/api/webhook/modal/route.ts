import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Webhook received from Modal:", JSON.stringify(body, null, 2));

    const { uploaded_file_id, clips, status, error } = body;

    if (!uploaded_file_id) {
      console.error("Missing uploaded_file_id in webhook payload");
      return NextResponse.json(
        { error: "Missing uploaded_file_id" },
        { status: 400 }
      );
    }

    // Check if file exists
    const uploadedFile = await db.uploadedFile.findUnique({
      where: { id: uploaded_file_id },
    });

    if (!uploadedFile) {
      console.error(`Uploaded file not found: ${uploaded_file_id}`);
      return NextResponse.json(
        { error: "Uploaded file not found" },
        { status: 404 }
      );
    }

    // Handle error status
    if (status === "failed" || error) {
      console.error(`Processing failed for ${uploaded_file_id}:`, error);
      await db.uploadedFile.update({
        where: { id: uploaded_file_id },
        data: { status: "failed" },
      });
      revalidatePath("/dashboard");
      return NextResponse.json({ success: true, message: "Status updated to failed" });
    }

    // Handle success with clips
    if (clips && Array.isArray(clips) && clips.length > 0) {
      console.log(`Processing ${clips.length} clips for file ${uploaded_file_id}`);

      // Create clips in database
      await db.clip.createMany({
        data: clips.map((clip: { s3_key?: string; s3Key?: string }) => ({
          s3Key: clip.s3_key || clip.s3Key,
          uploadedFileId: uploadedFile.id,
          userId: uploadedFile.userId,
        })),
      });

      // Decrement credits based on generated clips
      await db.user.update({
        where: { id: uploadedFile.userId },
        data: { credits: { decrement: clips.length } },
      });

      // Update file status to completed
      await db.uploadedFile.update({
        where: { id: uploaded_file_id },
        data: {
          status: "completed",
          uploaded: true,
        },
      });

      console.log(`Successfully processed ${clips.length} clips`);
      revalidatePath("/dashboard");
      return NextResponse.json({
        success: true,
        message: `Processed ${clips.length} clips`,
      });
    }

    // No clips but success status
    if (status === "completed") {
      await db.uploadedFile.update({
        where: { id: uploaded_file_id },
        data: {
          status: "completed",
          uploaded: true,
        },
      });
      console.log(`File ${uploaded_file_id} completed without clips`);
      revalidatePath("/dashboard");
      return NextResponse.json({ success: true, message: "Processing completed" });
    }

    // Update processing status
    await db.uploadedFile.update({
      where: { id: uploaded_file_id },
      data: {
        status: status || "processing",
      },
    });

    revalidatePath("/dashboard");
    return NextResponse.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
