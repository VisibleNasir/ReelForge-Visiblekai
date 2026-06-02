import { Sparkles, Video, Wand2, Rocket, Users, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-zinc-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-24">
        
        {/* Hero Section */}
        <section className="text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2">
            <Sparkles className="mr-2 h-4 w-4 text-violet-400" />
            <span className="text-sm text-violet-300">
              About ReelForge
            </span>
          </div>

          <h1 className="mx-auto max-w-5xl text-5xl font-bold tracking-tight md:text-7xl">
            Turn Long Videos Into
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              {" "}
              Viral Content
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg text-zinc-400 md:text-xl">
            ReelForge is an AI-powered content repurposing platform that helps
            creators, podcasters, agencies, and businesses transform long-form
            content into engaging short-form videos, captions, thumbnails, and
            social media assets in minutes.
          </p>
        </section>

        {/* Mission */}
        <section className="mt-32">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-10 backdrop-blur-xl">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-violet-500/10">
                <Target className="h-10 w-10 text-violet-400" />
              </div>

              <div>
                <h2 className="text-3xl font-bold">
                  Our Mission
                </h2>

                <p className="mt-4 max-w-4xl text-zinc-400">
                  Every podcast, webinar, interview, and video contains valuable
                  moments that deserve to be seen. ReelForge helps creators
                  unlock those moments instantly using AI, reducing hours of
                  editing into just a few clicks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mt-32">
          <div className="text-center">
            <h2 className="text-4xl font-bold">
              What ReelForge Does
            </h2>

            <p className="mt-4 text-zinc-400">
              Everything you need to create, optimize, and publish content.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8">
              <Video className="mb-4 h-10 w-10 text-violet-400" />
              <h3 className="text-xl font-semibold">
                AI Clip Generation
              </h3>
              <p className="mt-3 text-zinc-400">
                Automatically detect the most engaging moments from long-form
                videos and podcasts.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8">
              <Wand2 className="mb-4 h-10 w-10 text-violet-400" />
              <h3 className="text-xl font-semibold">
                Auto Captions
              </h3>
              <p className="mt-3 text-zinc-400">
                Generate dynamic subtitles optimized for modern short-form
                content.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8">
              <Rocket className="mb-4 h-10 w-10 text-violet-400" />
              <h3 className="text-xl font-semibold">
                Content Studio
              </h3>
              <p className="mt-3 text-zinc-400">
                Create titles, captions, hashtags, descriptions, and thumbnails
                automatically.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8">
              <Users className="mb-4 h-10 w-10 text-violet-400" />
              <h3 className="text-xl font-semibold">
                Multi-Platform Ready
              </h3>
              <p className="mt-3 text-zinc-400">
                Export content optimized for YouTube Shorts, TikTok, Instagram,
                LinkedIn, and more.
              </p>
            </div>

          </div>
        </section>

        {/* Audience */}
        <section className="mt-32">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-12">
            <h2 className="text-center text-4xl font-bold">
              Built For Creators
            </h2>

            <div className="mt-12 grid gap-8 md:grid-cols-3">

              <div>
                <h3 className="text-xl font-semibold">
                  🎙️ Podcasters
                </h3>
                <p className="mt-3 text-zinc-400">
                  Turn hours of podcast recordings into dozens of engaging clips.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  🎥 Content Creators
                </h3>
                <p className="mt-3 text-zinc-400">
                  Create more content without spending hours editing videos.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  🚀 Businesses
                </h3>
                <p className="mt-3 text-zinc-400">
                  Repurpose webinars, interviews, and marketing content into
                  social-ready assets.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-32 text-center">
          <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 p-16">
            <h2 className="text-4xl font-bold">
              Create More. Edit Less.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              Join creators using AI to transform long-form content into
              high-performing short-form videos and social media content.
            </p>

            <button className="mt-8 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 font-semibold transition hover:scale-105">
              Start Creating
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}