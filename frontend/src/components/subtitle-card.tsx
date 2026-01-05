"use client";

import { Button } from "./ui/button";
import { Loader2, FileText, Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { getSubtitleUrl } from "~/actions/subtitle";

export function SubtitleCard({
  uploadedFileId,
  status,
  hasSrt,
  hasVtt,
}: {
  uploadedFileId: string;
  status: string;
  hasSrt: boolean;
  hasVtt: boolean;
}) {
  const [loading, setLoading] = useState<"srt" | "vtt" | null>(null);

  const handleDownload = async (type: "srt" | "vtt") => {
    setLoading(type);

    const res = await getSubtitleUrl(uploadedFileId, type);

    if (!res.success || !res.url) {
      toast.error(res.error || "Failed to fetch subtitle");
      setLoading(null);
      return;
    }

    window.open(res.url, "_blank");
    setLoading(null);
  };

  return (
    <div className="rounded-xl border bg-zinc-50 p-6 dark:bg-zinc-900">
      <div className="flex items-center gap-3">
        <FileText className="h-6 w-6 text-zinc-500" />
        <h3 className="text-lg font-semibold">Subtitles</h3>
      </div>

      <p className="mt-1 text-sm text-zinc-500">
        Auto-generated subtitles ready for download.
      </p>

      {status !== "completed" && (
        <div className="mt-4 flex items-center gap-2 text-sm text-zinc-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Subtitles are being generated…
        </div>
      )}

      {status === "completed" && (
        <div className="mt-5 flex gap-3">
          <Button
            variant="outline"
            disabled={!hasSrt || loading === "srt"}
            onClick={() => handleDownload("srt")}
          >
            {loading === "srt" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            SRT
          </Button>

          <Button
            variant="outline"
            disabled={!hasVtt || loading === "vtt"}
            onClick={() => handleDownload("vtt")}
          >
            {loading === "vtt" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            VTT
          </Button>
        </div>
      )}
    </div>
  );
}
