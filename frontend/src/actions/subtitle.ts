"use server";

import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { env } from "~/env";
import { revalidatePath } from "next/cache";

export async function getSubtitleUrl(
  uploadedFileId: string,
  type: "srt" | "vtt"
) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  const file = await db.uploadedFile.findUnique({
    where: {
      id: uploadedFileId,
      userId: session.user.id,
    },
    select: {
      id: true,
      s3Key: true,
      subtitleSrt: true,
      subtitleVtt: true,
    },
  });

  if (!file) {
    return { success: false, error: "File not found" };
  }

  const key =
    type === "srt" ? file.subtitleSrt : file.subtitleVtt;

  if (!key) {
    return { success: false, error: "Subtitle not available yet" };
  }

  const s3 = new S3Client({
    region: env.AWS_REGION,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const command = new GetObjectCommand({
    Bucket: env.S3_BUCKET_NAME,
    Key: key,
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

  return { success: true, url };
}

export async function burnSubtitles(uploadedFileId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  console.log("Checking env vars for burn subtitle...");
  console.log("BURN_SUBTITLES_ENDPOINT:", env.BURN_SUBTITLES_ENDPOINT ? "SET" : "NOT SET");
  console.log("BURN_SUBTITLES_ENDPOINT_AUTH:", env.BURN_SUBTITLES_ENDPOINT_AUTH ? "SET" : "NOT SET");

  if (!env.BURN_SUBTITLES_ENDPOINT || !env.BURN_SUBTITLES_ENDPOINT_AUTH) {
    console.error("Burn subtitle env vars not configured");
    await db.uploadedFile.update({
      where: { id: uploadedFileId },
      data: { status: "failed" },
    });
    revalidatePath("/dashboard");
    return {
      success: false,
      error:
        "Subtitle endpoint not configured. Set BURN_SUBTITLES_ENDPOINT and BURN_SUBTITLES_ENDPOINT_AUTH.",
    };
  }

  const uploadedFile = await db.uploadedFile.findUnique({
    where: { id: uploadedFileId, userId: session.user.id },
    select: {
      id: true,
      userId: true,
      s3Key: true,
    },
  });

  if (!uploadedFile) {
    return { success: false, error: "Uploaded file not found" };
  }

  try {
    const payload = {
      s3_key: uploadedFile.s3Key,
      uploaded_file_id: uploadedFile.id,
      user_id: uploadedFile.userId,
      callback_url: `${env.BASE_URL}/api/webhook/modal`,
    };

    console.log("Sending to burn subtitle endpoint:", env.BURN_SUBTITLES_ENDPOINT);
    console.log("Payload:", JSON.stringify(payload, null, 2));

    const response = await fetch(env.BURN_SUBTITLES_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.BURN_SUBTITLES_ENDPOINT_AUTH}`,
      },
      body: JSON.stringify(payload),
    });

    console.log("Burn subtitle response status:", response.status);

    if (!response.ok) {
      const message = await response.text();
      console.error("Burn subtitle API error:", message);
      throw new Error(message || "Subtitle burn failed");
    }

    const data = await response.json();
    console.log("Burn subtitle response data:", JSON.stringify(data, null, 2));
    
    const outputKey = data.output_s3_key || data.outputS3Key;
    const clips = data.clips;

    if (outputKey) {
      await db.clip.create({
        data: {
          s3Key: outputKey,
          uploadedFileId: uploadedFile.id,
          userId: uploadedFile.userId,
        },
      });

      await db.user.update({
        where: { id: uploadedFile.userId },
        data: { credits: { decrement: 1 } },
      });
    } else if (Array.isArray(clips) && clips.length > 0) {
      await db.clip.createMany({
        data: clips.map((clip: { s3_key?: string; s3Key?: string }) => ({
          s3Key: clip.s3_key || clip.s3Key,
          uploadedFileId: uploadedFile.id,
          userId: uploadedFile.userId,
        })),
      });

      await db.user.update({
        where: { id: uploadedFile.userId },
        data: { credits: { decrement: clips.length } },
      });
    } else {
      // If nothing returned, mark as processing and rely on webhook
      await db.uploadedFile.update({
        where: { id: uploadedFile.id },
        data: { status: "processing" },
      });
      revalidatePath("/dashboard");
      return { success: true, message: "Burn in progress" };
    }

    await db.uploadedFile.update({
      where: { id: uploadedFile.id },
      data: {
        status: "completed",
        uploaded: true,
      },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    await db.uploadedFile.update({
      where: { id: uploadedFileId },
      data: { status: "failed" },
    });
    revalidatePath("/dashboard");
    return {
      success: false,
      error: error instanceof Error ? error.message : "Subtitle burn failed",
    };
  }
}
