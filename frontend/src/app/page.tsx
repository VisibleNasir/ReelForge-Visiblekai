import Link from "next/link";
import { redirect } from "next/navigation";
import NavHeader from "~/components/nav-header";
import { GlowingStarsBackgroundCard } from "~/components/ui/glowing-stars";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

// Import Glowing Stars Component
export default async function HomePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { credits: true, email: true },
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-hidden">
      <NavHeader credits={user?.credits} email={user?.email} />

      {/* Hero Section with Glowing Stars */}
<section className="relative pt-24 pb-20 px-6 min-h-[90vh] flex items-center overflow-hidden">


  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-zinc-950/60 z-[1]" />

  {/* Glow Effect */}
  <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_60%)]" />

  {/* Hero Content */}
  <div className="relative z-10 max-w-5xl mx-auto text-center">
    <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-tight mb-6">
      Podcast Clips.
      <br />
      <span className="bg-gradient-to-r from-zinc-200 via-white to-zinc-400 bg-clip-text text-transparent">
        Done Automatically.
      </span>
    </h1>

    <p className="mt-6 text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto">
      Generate scroll-stopping vertical clips, detect viral moments, and burn
      beautiful subtitles — all in minutes.
    </p>

    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
      <Link
        href="/user/dashboard"
        className="w-full sm:w-auto px-10 py-4 bg-white text-black font-semibold rounded-2xl hover:bg-zinc-200 transition text-lg shadow-lg shadow-white/10"
      >
        Generate Clips Now
      </Link>

      <Link
        href="#features"
        className="w-full sm:w-auto px-8 py-4 border border-zinc-700 hover:border-zinc-500 font-medium rounded-2xl transition text-lg flex items-center justify-center gap-2"
      >
        See How It Works
      </Link>
    </div>

    <p className="text-zinc-500 mt-4 text-sm">
      No credit card required • {user?.credits} credits available
    </p>
  </div>
</section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-zinc-900 border-t border-zinc-800 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Built for Podcast Creators Who Want to Grow
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 hover:border-indigo-500/50 transition-all group">
              <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                ✂️
              </div>
              <h3 className="text-2xl font-semibold mb-3">Smart Auto-Clipping</h3>
              <p className="text-zinc-400">
                Automatically detects the most engaging moments from long podcasts and turns them into vertical clips.
              </p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 hover:border-indigo-500/50 transition-all group">
              <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                🔥
              </div>
              <h3 className="text-2xl font-semibold mb-3">Viral Moment Detection</h3>
              <p className="text-zinc-400">
                Our AI finds emotional peaks, laughs, insights, and controversial takes — the moments that go viral.
              </p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 hover:border-indigo-500/50 transition-all group">
              <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                📝
              </div>
              <h3 className="text-2xl font-semibold mb-3">Auto Subtitles</h3>
              <p className="text-zinc-400">
                Beautiful, perfectly timed subtitles with multiple styles. Optimized for Reels, TikTok & YouTube Shorts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-zinc-900 to-zinc-950 relative z-10">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">
            Ready to turn your podcast into content that grows itself?
          </h2>
          <p className="text-zinc-400 text-lg mb-10">
            Join hundreds of creators already using ReelForge to 10x their reach.
          </p>
          <Link
            href="/user/dashboard"
            className="inline-block px-12 py-5 bg-white text-black font-semibold rounded-2xl text-xl hover:bg-zinc-200 transition"
          >
            Start Generating Clips →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12 bg-zinc-950 relative z-10">
        <div className="max-w-6xl mx-auto px-6 text-center text-zinc-500 text-sm">
          © 2026 ReelForge • Built for creators who want to focus on talking, not editing.
        </div>
      </footer>
    </div>
  );
}