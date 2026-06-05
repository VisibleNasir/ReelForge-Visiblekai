import { Star, Quote, TrendingUp, Users, Video, Sparkles } from "lucide-react";
import RippleGrid from "../../../components/RippleGrid";
export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Podcast Host",
      company: "Growth Weekly",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
      review:
        "ReelForge reduced our editing time by over 90%. We now publish 20+ clips per episode without hiring additional editors.",
    },
    {
      name: "Michael Chen",
      role: "Content Creator",
      company: "Tech Explained",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
      review:
        "The AI finds moments I would have missed completely. My Shorts views increased dramatically after switching to ReelForge.",
    },
    {
      name: "Jessica Martinez",
      role: "Marketing Director",
      company: "ScaleLabs",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
      review:
        "We repurpose webinars, customer interviews, and product demos into dozens of social clips every week. Massive time saver.",
    },
    {
      name: "David Wilson",
      role: "YouTuber",
      company: "Business Insights",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
      review:
        "The caption generation and viral title suggestions are incredible. It's like having a content team built into one platform.",
    },
    {
      name: "Emily Parker",
      role: "Agency Founder",
      company: "Social Growth Co.",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
      review:
        "Managing multiple client accounts became much easier. ReelForge has become a core part of our workflow.",
    },
    {
      name: "Ryan Thomas",
      role: "Entrepreneur",
      company: "Founder Stories",
      image:
        "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=200&q=80",
      review:
        "Every podcast episode now generates weeks of content. The ROI has been incredible for our business.",
    },
  ];

  const stats = [
    {
      icon: Video,
      value: "1M+",
      label: "Clips Generated",
    },
    {
      icon: Users,
      value: "10,000+",
      label: "Creators",
    },
    {
      icon: TrendingUp,
      value: "90%",
      label: "Time Saved",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <RippleGrid />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/85 to-black" />
      <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[130px]" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[700px] rounded-full bg-fuchsia-600/20 blur-[130px]" />

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-5 py-2 text-sm text-violet-200 backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            Customer Success Stories
          </div>

          <h1 className="mt-8 text-5xl font-black tracking-tight md:text-7xl">
            Creators are growing faster with{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              ReelForge
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
            Podcasters, agencies, YouTubers, and founders use ReelForge to turn
            long-form videos into viral short-form content in minutes.
          </p>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 hover:border-violet-500/40 hover:bg-violet-500/10"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 ring-1 ring-violet-500/30">
                <stat.icon className="h-8 w-8 text-violet-300" />
              </div>

              <h3 className="mt-5 text-5xl font-black">{stat.value}</h3>

              <p className="mt-2 text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-24 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/70 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-fuchsia-500/40 ${
                index === 1 || index === 4 ? "xl:-translate-y-8" : ""
              }`}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent opacity-70" />
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl transition group-hover:bg-fuchsia-500/20" />

              <Quote className="mb-6 h-10 w-10 text-violet-400 opacity-60" />

              <div className="mb-5 flex">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="relative z-10 min-h-28 leading-relaxed text-zinc-300">
                {testimonial.review}
              </p>

              <div className="mt-8 flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-14 w-14 rounded-full border border-white/10 object-cover"
                />

                <div>
                  <h4 className="font-semibold text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-zinc-500">{testimonial.role}</p>
                  <p className="text-sm text-violet-400">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-28 overflow-hidden rounded-[2rem] border border-violet-500/20 bg-gradient-to-br from-violet-600/20 via-zinc-950/80 to-fuchsia-600/20 p-10 text-center shadow-2xl shadow-violet-950/30 backdrop-blur-2xl md:p-14">
          <Quote className="mx-auto h-14 w-14 text-violet-300" />

          <h2 className="mx-auto mt-6 max-w-4xl text-3xl font-black leading-tight md:text-5xl">
            ReelForge transformed our content workflow. What used to take days
            now takes minutes.
          </h2>

          <p className="mt-6 text-zinc-400">
            Trusted by creators, marketers, agencies, and podcast teams.
          </p>
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-4xl font-black md:text-5xl">
            Ready to create more content?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-zinc-400">
            Start turning podcasts, interviews, webinars, and long-form videos
            into scroll-stopping short clips.
          </p>

          <button className="mt-8 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 font-semibold shadow-2xl shadow-violet-950/40 transition-all hover:scale-105 hover:from-violet-500 hover:to-fuchsia-500">
            Start Creating Today
          </button>
        </div>
      </section>
    </main>
  );
}