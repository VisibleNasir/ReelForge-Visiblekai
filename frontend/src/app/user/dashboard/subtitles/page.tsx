"use client";

import { useState } from "react";
import { Loader2, Sparkles, Subtitles, Video } from "lucide-react";
import { toast } from "sonner";

import { FileUpload } from "~/components/ui/file-upload";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

const subtitleStyles = [
  {
    id: "bold-yellow",
    name: "Bold Yellow",
    preview: "text-yellow-300 font-black bg-black",
  },
  {
    id: "white-shadow",
    name: "White Shadow",
    preview: "text-white font-bold drop-shadow-xl",
  },
  {
    id: "neon-purple",
    name: "Neon Purple",
    preview: "text-purple-300 font-black",
  },
  {
    id: "cinematic",
    name: "Cinematic",
    preview: "text-white font-serif tracking-wide",
  },
  {
    id: "minimal",
    name: "Minimal Clean",
    preview: "text-zinc-100 font-medium",
  },
  {
    id: "tiktok",
    name: "TikTok Pop",
    preview: "text-white font-black bg-pink-600",
  },
  {
    id: "gaming",
    name: "Gaming Green",
    preview: "text-green-400 font-black bg-black",
  },
  {
    id: "podcast",
    name: "Podcast Pro",
    preview: "text-orange-300 font-bold",
  },
  {
    id: "luxury",
    name: "Luxury Gold",
    preview: "text-amber-300 font-serif font-bold",
  },
  {
    id: "blue-glow",
    name: "Blue Glow",
    preview: "text-cyan-300 font-black",
  },
];

export default function SubtitleUploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedStyle, setSelectedStyle] = useState("bold-yellow");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (files: File[]) => {
    setFiles(files);
  };

  const handleApplySubtitles = async () => {
    if (!files.length) {
      toast.error("Please upload a video first");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", files[0]!);
      formData.append("subtitleStyle", selectedStyle);

      const response = await fetch("/api/subtitles", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to apply subtitles");
      }

      toast.success("Subtitle job started", {
        description:
          "Your video is being processed with custom subtitles.",
      });

      setFiles([]);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm">
            <Sparkles className="h-4 w-4 text-violet-400" />
            Subtitle Studio
          </div>

          <h1 className="text-5xl font-black tracking-tight">
            Add Stunning Subtitles To Your Videos
          </h1>

          <p className="mt-4 text-lg text-zinc-400">
            Upload your video, choose a subtitle style, and let ReelForge
            generate professional captions automatically.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <Card className="border-zinc-800 bg-zinc-950">
            <CardContent className="p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-violet-500/10 p-3">
                  <Video className="h-6 w-6 text-violet-400" />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    Upload Video
                  </h2>

                  <p className="text-sm text-zinc-500">
                    MP4, MOV, AVI supported
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900">
                <FileUpload onChange={handleFileUpload} />
              </div>

              {files.length > 0 && (
                <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
                  <p className="font-medium">
                    {files[0]?.name}
                  </p>

                  <p className="text-sm text-zinc-500">
                    {((files[0]?.size ?? 0) / (1024 * 1024)).toFixed(
                      1
                    )}{" "}
                    MB
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-zinc-800 bg-zinc-950">
            <CardContent className="p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-pink-500/10 p-3">
                  <Subtitles className="h-6 w-6 text-pink-400" />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    Subtitle Styles
                  </h2>

                  <p className="text-sm text-zinc-500">
                    Select your preferred style
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
  {subtitleStyles.map((style) => (
    <button
      key={style.id}
      onClick={() => setSelectedStyle(style.id)}
      className={`rounded-2xl border p-4 text-left transition-all ${
        selectedStyle === style.id
          ? "border-violet-500 bg-violet-500/10"
          : "border-zinc-800 bg-zinc-900 hover:border-zinc-600"
      }`}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="font-medium">{style.name}</span>

        {selectedStyle === style.id && (
          <span className="text-xs text-violet-400">Selected</span>
        )}
      </div>

      <div
        className={`inline-block rounded-lg px-3 py-1 text-sm ${style.preview}`}
      >
        This is subtitle preview
      </div>
    </button>
  ))}
</div>

              <Button
                onClick={handleApplySubtitles}
                disabled={loading}
                className="mt-6 h-14 w-full bg-gradient-to-r from-violet-600 to-pink-600 text-base font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Applying Subtitles...
                  </>
                ) : (
                  <>
                    <Subtitles className="mr-2 h-5 w-5" />
                    Apply Subtitles
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}