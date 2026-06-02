import { Accordion, AccordionItem, AccordionTrigger , AccordionContent} from "~/components/ui/accordion";
export default function FAQPage() {
  const faqs = [
    {
      question: "What is ReelForge?",
      answer:
        "ReelForge is an AI-powered content repurposing platform that transforms long-form videos, podcasts, interviews, and webinars into viral-ready short-form content for YouTube Shorts, Instagram Reels, TikTok, and other platforms.",
    },
    {
      question: "How does ReelForge generate clips?",
      answer:
        "Our AI analyzes your video, identifies engaging moments, detects speaker activity, processes transcripts, and automatically creates short-form clips optimized for social media.",
    },
    {
      question: "Can I upload my own videos?",
      answer:
        "Yes. You can upload MP4, MOV, and AVI files directly through the dashboard and let ReelForge process them automatically.",
    },
    {
      question: "Can I use YouTube links instead of uploading videos?",
      answer:
        "Yes. Simply paste a YouTube URL and ReelForge will download the video, process it, and generate clips automatically.",
    },
    {
      question: "What video formats are supported?",
      answer:
        "Currently ReelForge supports MP4, MOV, and AVI video formats. Additional formats may be added in future releases.",
    },
    {
      question: "Does ReelForge generate captions?",
      answer:
        "Yes. ReelForge can automatically generate subtitles and burn captions directly into your videos for higher engagement.",
    },
    {
      question: "Can ReelForge generate titles and hashtags?",
      answer:
        "Yes. The Content Studio can generate viral titles, social media captions, hashtags, thumbnail ideas, and SEO-friendly descriptions.",
    },
    {
      question: "Can I generate AI thumbnails?",
      answer:
        "Yes. ReelForge can generate thumbnail suggestions and AI-powered thumbnail images designed to improve click-through rates.",
    },
    {
      question: "Which platforms are supported?",
      answer:
        "ReelForge content is optimized for YouTube Shorts, Instagram Reels, TikTok, LinkedIn, Facebook Reels, and X.",
    },
    {
      question: "How long does processing take?",
      answer:
        "Processing time depends on video length and queue load. Most videos are processed within a few minutes.",
    },
    {
      question: "Are my videos private?",
      answer:
        "Yes. Your uploaded content is securely stored and processed. Only you can access your videos and generated clips.",
    },
    {
      question: "Do I need editing experience?",
      answer:
        "No. ReelForge is designed for creators of all skill levels. Simply upload a video or paste a YouTube link and the AI handles the editing process.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-zinc-900 text-white">
      <div className="mx-auto max-w-4xl px-6 py-24">
        {/* Hero */}
        <div className="text-center">
          <div className="inline-flex items-center rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            Frequently Asked Questions
          </div>

          <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-6xl">
            Got Questions?
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            Find answers about ReelForge, AI clip generation, content
            repurposing, pricing, uploads, and more.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index}
                value={`item-${index}`}
                className="border-zinc-800"
              >
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent className="text-zinc-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-3xl border border-violet-500/20 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 p-10 text-center">
          <h2 className="text-3xl font-bold">
            Still Have Questions?
          </h2>

          <p className="mt-4 text-zinc-400">
            Our team is here to help you get the most out of ReelForge.
          </p>

          <button className="mt-6 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 font-medium transition hover:scale-105">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}