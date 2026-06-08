"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  BadgeCheck,
  Copy,
  Hash,
  ImageIcon,
  Loader2,
  Send,
  Sparkles,
  Terminal,
  Wand2,
} from "lucide-react";

import { DashboardLayout } from "./dashboard-layout";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

type GeneratedContent = {
  titles: string[];
  captions: string[];
  hashtags: string[];
  keywords: string[];
  thumbnailPrompts: string[];
};

const defaultContent: GeneratedContent = {
  titles: [
    "This One Podcast Moment Could Change Your Mindset",
    "The Advice Every Creator Needs To Hear",
    "Why Most People Fail Before They Even Start",
    "This Guest Explained Success In 30 Seconds",
    "The Business Lesson Nobody Talks About",
  ],
  captions: [
    "Most people are chasing the result, but ignoring the system.\n\nThis clip explains the mindset shift that actually matters.\n\nSave this for later.",
    "This advice sounds simple, but it can save years of mistakes.\n\nWatch till the end and ask yourself: am I doing this?",
    "One powerful moment from the podcast.\n\nIf you are building, creating, or learning, this is worth hearing.",
  ],
  hashtags: [
    "#podcast",
    "#podcastclips",
    "#viral",
    "#motivation",
    "#business",
    "#creator",
    "#mindset",
    "#success",
    "#reels",
    "#shorts",
  ],
  keywords: [
    "podcast clips",
    "viral shorts",
    "creator growth",
    "business advice",
    "motivation",
    "entrepreneurship",
    "short form content",
    "reels strategy",
  ],
  thumbnailPrompts: [
    "A cinematic podcast thumbnail with dramatic lighting, surprised guest expression, bold text overlay saying 'THIS CHANGED EVERYTHING', dark studio background, premium YouTube style",
    "High contrast creator podcast thumbnail, neon purple and pink lighting, bold face reaction, clean modern typography, viral shorts aesthetic",
  ],
};

export function ContentStudioPage() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("viral");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<GeneratedContent>(defaultContent);
  const [activeTab, setActiveTab] = useState<
    "titles" | "captions" | "hashtags" | "thumbnails"
  >("titles");

  const selectedToneLabel = useMemo(() => {
    return tone.charAt(0).toUpperCase() + tone.slice(1);
  }, [tone]);

  const copyText = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  };

  const generateContent = async () => {
    if (!topic.trim()) {
      toast.error("Enter your podcast topic or clip idea first");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/generate-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          tone,
          prompt: `Generate viral short-form content package for this podcast/video topic: ${topic}. Tone: ${tone}. Return JSON with titles, captions, hashtags, keywords, thumbnailPrompts.`,
        }),
      });

      if (!response.ok) {
        throw new Error("AI generation failed");
      }

      const data = await response.json();

      setContent({
        titles: data.titles ?? defaultContent.titles,
        captions: data.captions ?? defaultContent.captions,
        hashtags: data.hashtags ?? defaultContent.hashtags,
        keywords: data.keywords ?? defaultContent.keywords,
        thumbnailPrompts:
          data.thumbnailPrompts ?? defaultContent.thumbnailPrompts,
      });

      toast.success("Content generated with AI");
    } catch {
      toast.error("Using demo content for now", {
        description: "Connect this page with Gemini API route later.",
      });
      setContent(defaultContent);
    } finally {
      setLoading(false);
    }
  };

  return (
      <section className="relative min-h-screen overflow-hidden rounded-3xl bg-black text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-[400px] w-[700px] rounded-full bg-fuchsia-600/20 blur-[120px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="relative z-10 px-6 py-10 lg:px-10">
          <div className="mb-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Badge className="mb-5 border-violet-500/30 bg-violet-500/10 text-violet-200">
                <Sparkles className="mr-2 h-4 w-4" />
                AI Content Studio
              </Badge>

              <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
                Generate titles, captions, hashtags and thumbnails with AI.
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
                Turn one podcast clip idea into a complete posting package for
                YouTube Shorts, Instagram Reels, and TikTok.
              </p>
            </div>

            <Card className="border-white/10 bg-zinc-950/70 shadow-2xl shadow-violet-950/30 backdrop-blur-2xl">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Terminal className="h-5 w-5 text-emerald-400" />
                  <p className="font-mono text-sm text-zinc-300">
                    reelforge-ai-terminal
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black p-4 font-mono text-sm text-zinc-400">
                  <p>
                    <span className="text-emerald-400">$</span> analyzing clip
                    context...
                  </p>
                  <p>
                    <span className="text-emerald-400">$</span> generating
                    hooks...
                  </p>
                  <p>
                    <span className="text-emerald-400">$</span> optimizing for{" "}
                    <span className="text-violet-300">{selectedToneLabel}</span>{" "}
                    tone
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8 border-white/10 bg-zinc-950/75 shadow-2xl backdrop-blur-2xl">
            <CardContent className="p-6">
              <div className="grid gap-4 lg:grid-cols-[1fr_180px_180px]">
                <Input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Example: Founder explains why most startups fail..."
                  className="h-14 border-white/10 bg-black/70 text-white placeholder:text-zinc-600"
                />

                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="h-14 rounded-md border border-white/10 bg-black/70 px-4 text-sm text-white outline-none"
                >
                  <option value="viral">Viral</option>
                  <option value="professional">Professional</option>
                  <option value="motivational">Motivational</option>
                  <option value="funny">Funny</option>
                  <option value="educational">Educational</option>
                </select>

                <Button
                  onClick={generateContent}
                  disabled={loading}
                  className="h-14 bg-gradient-to-r from-violet-600 to-fuchsia-600 font-semibold"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-5 w-5" />
                      Generate
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mb-6 flex flex-wrap gap-3">
            {[
              ["titles", "Titles"],
              ["captions", "Captions"],
              ["hashtags", "Hashtags"],
              ["thumbnails", "Thumbnails"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as typeof activeTab)}
                className={`rounded-full border px-5 py-2 text-sm transition ${
                  activeTab === id
                    ? "border-violet-400 bg-violet-500/20 text-white"
                    : "border-white/10 bg-black/40 text-zinc-400 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {activeTab === "titles" && (
            <div className="grid gap-4">
              {content.titles.map((title, index) => (
                <Card
                  key={index}
                  className="group border-white/10 bg-zinc-950/70 transition hover:border-violet-500/50 hover:bg-zinc-900/80"
                >
                  <CardContent className="flex items-center justify-between gap-4 p-5">
                    <div>
                      <p className="text-lg font-semibold">{title}</p>
                      <p className="mt-1 text-sm text-zinc-500">
                        Hook optimized title #{index + 1}
                      </p>
                    </div>

                    <Button
                      variant="secondary"
                      onClick={() => copyText(title, "Title")}
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "captions" && (
            <div className="grid gap-5 md:grid-cols-2">
              {content.captions.map((caption, index) => (
                <Card
                  key={index}
                  className="border-white/10 bg-zinc-950/70 transition hover:border-fuchsia-500/50"
                >
                  <CardContent className="p-5">
                    <Textarea
                      value={caption}
                      readOnly
                      className="min-h-40 border-white/10 bg-black/70 text-zinc-300"
                    />

                    <Button
                      className="mt-4"
                      onClick={() => copyText(caption, "Caption")}
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Caption
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "hashtags" && (
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-white/10 bg-zinc-950/70">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <Hash className="h-5 w-5 text-violet-400" />
                    <h3 className="text-xl font-semibold">Hashtags</h3>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {content.hashtags.map((tag) => (
                      <Badge
                        key={tag}
                        onClick={() => copyText(tag, "Hashtag")}
                        className="cursor-pointer border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-200"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-zinc-950/70">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <BadgeCheck className="h-5 w-5 text-emerald-400" />
                    <h3 className="text-xl font-semibold">SEO Keywords</h3>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {content.keywords.map((keyword) => (
                      <Badge
                        key={keyword}
                        variant="outline"
                        className="border-white/10 px-4 py-2 text-sm"
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "thumbnails" && (
            <div className="grid gap-5 md:grid-cols-2">
              {content.thumbnailPrompts.map((prompt, index) => (
                <Card
                  key={index}
                  className="overflow-hidden border-white/10 bg-zinc-950/70"
                >
                  <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-violet-600/30 via-black to-fuchsia-600/30">
                    <ImageIcon className="h-16 w-16 text-white/60" />
                  </div>

                  <CardContent className="p-5">
                    <p className="mb-4 text-sm leading-6 text-zinc-300">
                      {prompt}
                    </p>

                    <Button
                      onClick={() => copyText(prompt, "Thumbnail prompt")}
                      className="w-full"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Copy Thumbnail Prompt
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
  );
}