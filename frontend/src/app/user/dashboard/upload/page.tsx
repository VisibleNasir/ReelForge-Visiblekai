import { redirect } from "next/navigation";
import { UploadVideoPage } from "~/components/upload-video-page";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

export default async function UploadPage() {
  const session = await auth();

  if (!session?.user?.id) redirect("/login");

  const userData = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      uploadedFiles: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          s3Key: true,
          displayName: true,
          status: true,
          uploaded: true,
          createdAt: true,
          _count: {
            select: {
              clips: true,
            },
          },
        },
      },
    },
  });

  if (!userData) redirect("/login");

  const uploadedFiles = userData.uploadedFiles.map((file) => ({
    id: file.id,
    s3Key: file.s3Key,
    filename: file.displayName ?? "Unknown filename",
    status: file.status,
    clipsCount: file._count.clips,
    createdAt: file.createdAt,
  }));

  return <UploadVideoPage uploadedFiles={uploadedFiles} />;
}