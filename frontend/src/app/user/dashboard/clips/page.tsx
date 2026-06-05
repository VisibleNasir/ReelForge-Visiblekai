import { redirect } from "next/navigation";
import { ClipsPage } from "~/components/clips-page";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

export default async function MyClipsPage() {
  const session = await auth();

  if (!session?.user?.id) redirect("/login");

  const userData = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      clips: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!userData) redirect("/login");

  return <ClipsPage clips={userData.clips} />;
}