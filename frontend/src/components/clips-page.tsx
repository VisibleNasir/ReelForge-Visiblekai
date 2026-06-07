"use client";

import { Sparkles, Video } from "lucide-react";
import GradientBlinds from "./GradientBlinds";
import { ClipDisplay } from "./clip-display";
import { HeroVideoDialog } from "./ui/hero-video-dialog";
interface Clip {
  id: string;
}

export function ClipsPage({ clips }: { clips: Clip[] }) {
  return (
      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl bg-black text-white">
        <div className="absolute inset-0">
          <GradientBlinds
            gradientColors={["#FF9FFC", "#5227FF"]}
            angle={20}
            noise={0.5}
            blindCount={16}
            blindMinWidth={60}
            spotlightRadius={0.5}
            spotlightSoftness={1}
            spotlightOpacity={1}
            mouseDampening={0.15}
            distortAmount={0}
            shineDirection="left"
            mixBlendMode="lighten"
            color1="#FF9FFC"
            color2="#5227FF"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/75 to-black" />

        <div className="relative z-10 px-6 py-10 lg:px-10">
          <div className="mb-10 grid items-center gap-10 lg:grid-cols-[1fr_460px]">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-zinc-300 backdrop-blur-xl">
                <Sparkles className="h-4 w-4 text-fuchsia-300" />
                AI Generated Shorts
              </div>

              <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
                Your generated clips are ready.
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
                Preview, download, and post your AI-generated vertical clips
                across Reels, Shorts, and TikTok.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-zinc-300">
                <span className="rounded-full border border-white/10 bg-black/40 px-4 py-2">
                  {clips.length} Clips
                </span>
                <span className="rounded-full border border-white/10 bg-black/40 px-4 py-2">
                  Vertical 9:16
                </span>
                <span className="rounded-full border border-white/10 bg-black/40 px-4 py-2">
                  Ready to Post
                </span>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative rotate-2 rounded-[2rem] border border-white/10 bg-black/50 p-4 shadow-2xl shadow-fuchsia-950/40 backdrop-blur-xl transition hover:rotate-0">
                <HeroVideoDialog
                  className="block dark:hidden"
                  animationStyle="from-center"
                  videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                  thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
                  thumbnailAlt="Generated Clip Preview"
                />

                <HeroVideoDialog
                  className="hidden dark:block"
                  animationStyle="from-center"
                  videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                  thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
                  thumbnailAlt="Generated Clip Preview"
                />

                <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/60 p-4">
                  <div className="rounded-xl bg-fuchsia-500/10 p-3">
                    <Video className="h-5 w-5 text-fuchsia-300" />
                  </div>
                  <div>
                    <p className="font-medium">Clip Preview</p>
                    <p className="text-sm text-zinc-400">
                      Tilted preview card for generated clips
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-black/50 p-5 shadow-2xl backdrop-blur-2xl">
            <ClipDisplay clips={clips} />
          </div>
        </div>
      </section>
  );
}