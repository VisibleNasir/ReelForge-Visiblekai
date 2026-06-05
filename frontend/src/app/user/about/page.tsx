import {
  Sparkles,
  Video,
  Wand2,
  Rocket,
  Users,
  Target,
  Brain,
  Scissors,
  Captions,
  Share2,
} from "lucide-react";
import CircularGallery from "~/components/CircularGallery";


export default function AboutPage() {
  const features = [
    {
      icon: Scissors,
      title: "AI Clip Generation",
      description:
        "Detects the most engaging podcast moments and converts them into short-form clips.",
    },
    {
      icon: Captions,
      title: "Smart Subtitles",
      description:
        "Generates clean, readable, platform-ready captions for short-form videos.",
    },
    {
      icon: Brain,
      title: "Viral Intelligence",
      description:
        "Analyzes hooks, topics, and context to suggest titles, captions, and content ideas.",
    },
    {
      icon: Share2,
      title: "Social Ready",
      description:
        "Prepares content for YouTube Shorts, Instagram Reels, TikTok, and LinkedIn.",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <section className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#5227ff33,transparent_35%),radial-gradient(circle_at_bottom_right,#ff4ecd22,transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:70px_70px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 backdrop-blur-xl">
              <Sparkles className="mr-2 h-4 w-4 text-violet-400" />
              <span className="text-sm text-violet-300">
                About ReelForge
              </span>
            </div>

            <h1 className="text-5xl font-black tracking-tight md:text-7xl">
              We turn long videos into{" "}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                viral short-form content
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-zinc-400 md:text-xl">
              ReelForge is an AI-powered content repurposing platform built for
              creators, podcasters, agencies, and businesses who want to create
              more content without spending hours editing.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button className="rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 font-semibold shadow-2xl shadow-violet-950/40 transition hover:scale-105">
                Start Creating
              </button>

              <button className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-zinc-200 backdrop-blur-xl transition hover:bg-white/10">
                See Features
              </button>
            </div>
          </div>

          <div className="mt-24 grid gap-6 md:grid-cols-3">
            {[
              ["10x", "Faster editing workflow"],
              ["1 click", "Clip generation process"],
              ["9:16", "Short-form ready output"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-2xl"
              >
                <h3 className="text-5xl font-black text-white">{value}</h3>
                <p className="mt-3 text-zinc-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-[2rem] border border-white/10 bg-zinc-950/80 p-10 shadow-2xl shadow-violet-950/20 backdrop-blur-2xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-violet-500/10 ring-1 ring-violet-500/30">
              <Target className="h-10 w-10 text-violet-400" />
            </div>

            <div>
              <h2 className="text-3xl font-black md:text-4xl">
                Our Mission
              </h2>

              <p className="mt-4 max-w-4xl text-lg leading-8 text-zinc-400">
                Every long-form video contains powerful ideas, stories, lessons,
                and viral moments. Our mission is to help creators unlock those
                moments instantly using AI, so they can focus on creating while
                ReelForge handles the repetitive editing workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
            <Rocket className="mr-2 h-4 w-4 text-fuchsia-400" />
            Platform Capabilities
          </div>

          <h2 className="mt-6 text-4xl font-black md:text-6xl">
            What ReelForge does
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            A complete workflow for turning podcasts and long videos into
            social-ready clips.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-3xl border border-white/10 bg-zinc-950/70 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-violet-500/40 hover:bg-violet-500/10"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 ring-1 ring-violet-500/30">
                <feature.icon className="h-7 w-7 text-violet-300" />
              </div>

              <h3 className="text-xl font-bold">{feature.title}</h3>

              <p className="mt-4 leading-7 text-zinc-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
              <Users className="mr-2 h-4 w-4 text-violet-400" />
              Meet The Team
            </div>

            <h2 className="mt-6 text-4xl font-black md:text-6xl">
              Built by creators for creators
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              ReelForge is crafted by a team focused on AI, video automation,
              product design, and creator workflows.
            </p>
          </div>

          <div className="relative h-[600px] overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/70 backdrop-blur-2xl">
            <CircularGallery
              bend={1}
              textColor="#ffffff"
              borderRadius={0.05}
              scrollEase={0.05}
              fontUrl=""
              font="bold 30px Orbitron"
              scrollSpeed={2}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-[2rem] border border-violet-500/20 bg-gradient-to-br from-violet-600/20 via-zinc-950 to-fuchsia-600/20 p-12 text-center shadow-2xl shadow-violet-950/40 md:p-16">
          <h2 className="text-4xl font-black md:text-6xl">
            Create more. Edit less.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
            Join creators using AI to transform long-form content into
            high-performing short-form videos, subtitles, thumbnails, and social
            media assets.
          </p>

          <button className="mt-8 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 font-semibold shadow-2xl shadow-violet-950/40 transition hover:scale-105">
            Start Creating
          </button>
        </div>
      </section>
    </main>
  );
}