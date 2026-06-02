import { Star, Quote, TrendingUp, Users, Video } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-zinc-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-24">

        {/* Hero */}
        <div className="text-center">
          <div className="inline-flex items-center rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            Customer Success Stories
          </div>

          <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-7xl">
            Loved By
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              {" "}Creators
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-zinc-400">
            Thousands of creators, podcasters, agencies, and businesses use
            ReelForge to transform long-form content into high-performing
            short-form videos.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 text-center backdrop-blur-xl"
            >
              <stat.icon className="mx-auto h-10 w-10 text-violet-400" />

              <h3 className="mt-4 text-4xl font-bold">
                {stat.value}
              </h3>

              <p className="mt-2 text-zinc-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="group rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/30 hover:bg-zinc-900/70"
            >
              <Quote className="mb-6 h-10 w-10 text-violet-400 opacity-50" />

              <div className="mb-4 flex">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="leading-relaxed text-zinc-300">
                {testimonial.review}
              </p>

              <div className="mt-8 flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-14 w-14 rounded-full object-cover"
                />

                <div>
                  <h4 className="font-semibold">
                    {testimonial.name}
                  </h4>

                  <p className="text-sm text-zinc-500">
                    {testimonial.role}
                  </p>

                  <p className="text-sm text-violet-400">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Quote */}
        <div className="mt-24 rounded-3xl border border-violet-500/20 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 p-12 text-center">
          <Quote className="mx-auto h-12 w-12 text-violet-400" />

          <h2 className="mx-auto mt-6 max-w-4xl text-3xl font-bold leading-relaxed md:text-4xl">
            ReelForge transformed our content workflow. What used to take
            days now takes minutes.
          </h2>

          <p className="mt-6 text-zinc-400">
            — Trusted by creators worldwide
          </p>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-4xl font-bold">
            Ready To Create More Content?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Join thousands of creators using ReelForge to turn long-form
            content into viral clips, captions, and social media assets.
          </p>

          <button className="mt-8 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 font-semibold transition-all hover:scale-105">
            Start Creating Today
          </button>
        </div>

      </div>
    </div>
  );
}