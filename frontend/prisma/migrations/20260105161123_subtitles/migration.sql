-- CreateTable
CREATE TABLE "SubtitleJob" (
    "id" TEXT NOT NULL,
    "videoS3Key" TEXT NOT NULL,
    "subtitleS3Key" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SubtitleJob_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubtitleJob" ADD CONSTRAINT "SubtitleJob_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
