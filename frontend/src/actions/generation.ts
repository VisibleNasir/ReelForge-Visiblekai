"use server";

import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { revalidatePath } from "next/cache";
import { env } from "~/env";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

export async function processVideo(uploadedFileId: string) {
  const uploadedVideo = await db.uploadedFile.findUnique({
    where: {
      id: uploadedFileId,
    },
    select: {
      uploaded: true,
      id: true,
      userId: true,
      s3Key: true,
    },
  });

  if (!uploadedVideo) {
    console.error(`Uploaded file not found: ${uploadedFileId}`);
    return;
  }

  if (uploadedVideo.uploaded) return;

  try {
    // Call Modal endpoint directly - using snake_case as Modal expects
    const payload = {
      uploaded_file_id: uploadedVideo.id,
      user_id: uploadedVideo.userId,
      s3_key: uploadedVideo.s3Key,
      s3_bucket: env.S3_BUCKET_NAME,
      aws_region: env.AWS_REGION,
      callback_url: `${env.BASE_URL}/api/webhook/modal`,
    };

    console.log("Sending to Modal:", JSON.stringify(payload, null, 2));
    console.log("Modal endpoint:", env.PROCESS_VIDEO_ENDPOINT);

    const response = await fetch(env.PROCESS_VIDEO_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${env.PROCESS_VIDEO_ENDPOINT_AUTH}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const responseText = await response.text();
      console.error("Modal response error:", responseText);
      throw new Error(
        `Modal API error: ${response.statusText} - ${responseText}`
      );
    }

    const responseData = await response.json();
    console.log("Modal response received:", JSON.stringify(responseData, null, 2));

    // Check for error status in response
    if (responseData.status === "failed" || responseData.error) {
      console.error("Modal returned error:", responseData.error || responseData);
      throw new Error(responseData.error || "Processing failed on Modal");
    }

    // Handle different response types from Modal
    let clips = null;
    
    // If Modal returns clips directly in response (synchronous)
    if (responseData.clips && Array.isArray(responseData.clips)) {
      clips = responseData.clips;
      console.log(`Received ${clips.length} clips from Modal response`);
    }
    
    // Save clips if we got them
    if (clips && clips.length > 0) {
      await db.clip.createMany({
        data: clips.map((clip: { s3_key?: string; s3Key?: string }) => ({
          s3Key: clip.s3_key || clip.s3Key,
          uploadedFileId: uploadedVideo.id,
          userId: uploadedVideo.userId,
        })),
      });
      console.log(`Saved ${clips.length} clips to database`);
    } else {
      // If Modal returns async processing status, update file status and wait for webhook
      console.log("Modal is processing video asynchronously, waiting for webhook callback");
      await db.uploadedFile.update({
        where: { id: uploadedFileId },
        data: {
          status: responseData.status || "processing",
        },
      });
      revalidatePath("/dashboard");
      return;
    }
  } catch (error) {
    console.error("Failed to send to Modal:", error);
    // Update status to failed
    await db.uploadedFile.update({
      where: { id: uploadedFileId },
      data: {
        status: "failed",
      },
    });
    revalidatePath("/dashboard");
    return;
  }

  await db.uploadedFile.update({
    where: {
      id: uploadedFileId,
    },
    data: {
      uploaded: true,
      status: "completed",
    },
  });

  revalidatePath("/dashboard");
}

export async function getClipPlayUrl(
  clipId: string,
): Promise<{ succes: boolean; url?: string; error?: string }> {
  const session = await auth();
  if (!session?.user?.id) {
    return { succes: false, error: "Unauthorized" };
  }

  try {
    const clip = await db.clip.findUnique({
      where: {
        id: clipId,
        userId: session.user.id,
      },
    });

    if (!clip) {
      return { succes: false, error: "Clip not found." };
    }

    const s3Client = new S3Client({
      region: env.AWS_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const command = new GetObjectCommand({
      Bucket: env.S3_BUCKET_NAME,
      Key: clip.s3Key,
    });

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });

    return { succes: true, url: signedUrl };
  } catch {
    return { succes: false, error: "Failed to generate play URL." };
  }
}
