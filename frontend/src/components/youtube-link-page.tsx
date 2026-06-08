"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Youtube, Link2, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { DashboardLayout } from "./dashboard-layout";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import DotGrid from "./DotGrid";
import { Safari } from "./ui/safari";

export function YouTubeLinkPage() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [youtubeLoading, setYoutubeLoading] = useState(false);

  const router = useRouter();

  const handleYoutubeProcess = async () => {
    if (!youtubeUrl.trim()) {
      toast.error("Please enter a YouTube URL");
      return;
    }

    setYoutubeLoading(true);

    try {
      const response = await fetch("/api/youtube", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: youtubeUrl,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to process video");
      }

      setYoutubeUrl("");

      toast.success("YouTube video submitted", {
        description: "Video is being downloaded and processed into viral clips.",
      });

      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to process video"
      );
    } finally {
      setYoutubeLoading(false);
    }
  };

  return (
      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-zinc-800 bg-black">
        <div className="absolute inset-0">
          <DotGrid
            dotSize={5}
            gap={15}
            baseColor="#2F293A"
            activeColor="#5227FF"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5} style={undefined}          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />

        <div className="relative z-10 grid min-h-[calc(100vh-4rem)] items-center gap-10 px-6 py-12 lg:grid-cols-2 lg:px-12">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/80 px-4 py-2 text-sm text-zinc-300 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-violet-400" />
              AI YouTube Clip Generator
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white md:text-6xl">
                Turn YouTube podcasts into viral short clips.
              </h1>

              <p className="max-w-xl text-lg leading-8 text-zinc-400">
                Paste a YouTube podcast, interview, or long-form video link.
                ReelForge will download, analyze, and prepare it for clip
                generation.
              </p>
            </div>

            <Card className="border border-zinc-800 bg-zinc-950/80 shadow-2xl shadow-violet-950/20 backdrop-blur-2xl">
              <CardContent className="p-6 md:p-8">
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-2xl bg-red-500/10 p-4 ring-1 ring-red-500/20">
                    <Youtube className="h-8 w-8 text-red-500" />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Import From YouTube
                    </h3>
                    <p className="text-sm text-zinc-400">
                      Paste a podcast or long-form video link
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 md:flex-row">
                  <Input
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="h-14 border-zinc-800 bg-black/70 text-white placeholder:text-zinc-600 focus-visible:ring-violet-500"
                  />

                  <Button
                    size="lg"
                    onClick={handleYoutubeProcess}
                    disabled={youtubeLoading}
                    className="h-14 whitespace-nowrap bg-gradient-to-r from-red-600 to-violet-600 px-8 font-semibold text-white shadow-lg shadow-red-950/30 hover:from-red-500 hover:to-violet-500"
                  >
                    {youtubeLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Link2 className="mr-2 h-4 w-4" />
                        Generate Clips
                      </>
                    )}
                  </Button>
                </div>

                <div className="mt-5 flex flex-wrap gap-2 text-xs text-zinc-500">
                  <span className="rounded-full border border-zinc-800 px-3 py-1">
                    YouTube Podcasts
                  </span>
                  <span className="rounded-full border border-zinc-800 px-3 py-1">
                    Interviews
                  </span>
                  <span className="rounded-full border border-zinc-800 px-3 py-1">
                    Long-form Videos
                  </span>
                  <span className="rounded-full border border-zinc-800 px-3 py-1">
                    AI Clip Detection
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-r from-red-500/20 via-violet-500/20 to-fuchsia-500/20 blur-3xl" />

              <div className="relative rounded-[2rem] border border-zinc-800 bg-zinc-950/80 p-4 shadow-2xl backdrop-blur-xl">
                <Safari url="youtube.com/watch?v=podcast" />

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-zinc-800 bg-black/60 p-4">
                    <p className="text-2xl font-bold text-white">01</p>
                    <p className="text-xs text-zinc-500">Paste Link</p>
                  </div>

                  <div className="rounded-2xl border border-zinc-800 bg-black/60 p-4">
                    <p className="text-2xl font-bold text-white">02</p>
                    <p className="text-xs text-zinc-500">AI Analyze</p>
                  </div>

                  <div className="rounded-2xl border border-zinc-800 bg-black/60 p-4">
                    <p className="text-2xl font-bold text-white">03</p>
                    <p className="text-xs text-zinc-500">Generate Clips</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}