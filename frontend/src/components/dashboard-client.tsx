"use client";

import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Loader2, Upload, Video, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { processVideo } from "~/actions/generation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";
import { ClipDisplay } from "./clip-display";
import { SubtitleStudio } from "./subtitle-studio";
import { Input } from "./ui/input";
import { Youtube, Link2 } from "lucide-react";
interface Clip {
  id: string;
}

export function DashboardClient({
  uploadedFiles,
  clips,
}: {
  uploadedFiles: {
    id: string;
    s3Key: string;
    filename: string;
    status: string;
    clipsCount: number;
    createdAt: Date;
  }[];
  clips: Clip[];
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [subtitleFiles, setSubtitleFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [subtitleUploading, setSubtitleUploading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
const [youtubeUrl, setYoutubeUrl] = useState("");
const [youtubeLoading, setYoutubeLoading] = useState(false);
const [thumbnailLoading, setThumbnailLoading] = useState(false);
const [generatedThumbnails, setGeneratedThumbnails] = useState<string[]>([]);
  useEffect(() => {
    if (!selectedFileId && uploadedFiles.length > 0) {
      setSelectedFileId(uploadedFiles[0]?.id ?? null);
    }
  }, [uploadedFiles, selectedFileId]);

  useEffect(() => {
    const processingFiles = uploadedFiles.some(
      (f) => f.status === "processing" || f.status === "uploading"
    );

    if (processingFiles) {
      const interval = setInterval(() => {
        router.refresh();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [uploadedFiles, router]);
const generateThumbnail = async () => {
  try {
    setThumbnailLoading(true);

    const response = await fetch("/api/generate-thumbnail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clipId: selectedFileId,
      }),
    });

    const data = await response.json();

    setGeneratedThumbnails(data.images);
  } catch (error) {
    toast.error("Failed to generate thumbnails");
  } finally {
    setThumbnailLoading(false);
  }
};
  const handleRefresh = async () => {
    setRefreshing(true);
    router.refresh();
    setTimeout(() => setRefreshing(false), 800);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => setFiles(acceptedFiles),
    accept: { "video/*": [".mp4", ".mov", ".avi"] },
    maxSize: 500 * 1024 * 1024,
    maxFiles: 1,
    disabled: uploading,
  });
const titles = [
  "🔥 This Podcast Moment Changed Everything",
  "🔥 Nobody Expected This Answer",
  "🔥 The Business Lesson Nobody Talks About",
  "🔥 Why Most People Fail At This",
  "🔥 This Advice Could Save You Years",
];

const hashtags = [
  "#podcast",
  "#podcastclips",
  "#viral",
  "#motivation",
  "#business",
  "#entrepreneur",
  "#mindset",
  "#success",
  "#reels",
  "#shorts",
];

const thumbnailIdeas = [
  {
    title: "Shock Value",
    description:
      "😲 Surprised face + red arrow + bold text 'Nobody Saw This Coming'",
  },
  {
    title: "Money Hook",
    description:
      "💰 Dollar sign + podcast mic + text 'Million Dollar Mistake'",
  },
  {
    title: "Curiosity",
    description:
      "🤯 Guest reaction + zoom effect + text 'What Happened Next?'",
  },
];

const captions = [
  "Most people focus on the wrong things.\n\nIn this clip, the guest explains the mindset shift that changes everything.\n\nWatch until the end 👇",

  "This might be the best advice you'll hear today.\n\nSimple. Practical. Powerful.\n\nWould you agree?",

  "The biggest mistake beginners make is revealed in this podcast clip.\n\nSave this for later.",
];
  const {
    getRootProps: getSubtitleRootProps,
    getInputProps: getSubtitleInputProps,
    isDragActive: isSubtitleDragActive,
  } = useDropzone({
    onDrop: (acceptedFiles) => setSubtitleFiles(acceptedFiles),
    accept: { "video/*": [".mp4", ".mov", ".avi"] },
    maxSize: 500 * 1024 * 1024,
    maxFiles: 1,
    disabled: subtitleUploading,
  });

  const handleUpload = async () => {
    if (files.length === 0) return;
    const file = files[0]!;
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.error || `Upload failed: ${uploadResponse.status}`);
      }

      const { uploadedFileId } = await uploadResponse.json();
      await processVideo(uploadedFileId);
      setSelectedFileId(uploadedFileId);
      setFiles([]);

      toast.success("Video uploaded successfully", {
        description: "AI is now generating your viral clips. Auto-refreshing...",
        duration: 6000,
      });
    } catch (err) {
      toast.error("Upload failed", {
        description: err instanceof Error ? err.message : "An unexpected error occurred.",
      });
    } finally {
      setUploading(false);
    }
  };
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

    const { uploadedFileId } = await response.json();

    setSelectedFileId(uploadedFileId);
    setYoutubeUrl("");

    toast.success("YouTube video submitted", {
      description:
        "Video is being downloaded and processed into viral clips.",
    });

    router.refresh();
  } catch (error) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to process video"
    );
  } finally {
    setYoutubeLoading(false);
  }
};
  const handleSubtitleUpload = async () => {
    if (subtitleFiles.length === 0) return;
    const file = subtitleFiles[0]!;
    setSubtitleUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await fetch("/api/subtitle-upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.error || `Upload failed: ${uploadResponse.status}`);
      }

      const { uploadedFileId } = await uploadResponse.json();
      setSubtitleFiles([]);
      setSelectedFileId(uploadedFileId);

      toast.success("Subtitle burning started", {
        description: "Your video with burned subtitles will be ready soon.",
        duration: 6000,
      });
    } catch (err) {
      toast.error("Subtitle upload failed", {
        description: err instanceof Error ? err.message : "An unexpected error occurred.",
      });
    } finally {
      setSubtitleUploading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "uploading":
      case "queued":
        return <Badge variant="secondary">Queued</Badge>;
      case "processing":
        return <Badge variant="secondary">Processing</Badge>;
      case "completed":
        return <Badge className="bg-emerald-500 hover:bg-emerald-600">Ready</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "no credits":
        return <Badge variant="destructive">No Credits</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const regularUploads = uploadedFiles.filter(file => file.s3Key.includes('/original.'));
  const subtitleBurns = uploadedFiles.filter(file => file.s3Key.includes('/subtitle.'));

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="inline-flex h-14 items-center justify-center rounded-2xl bg-zinc-900/80 p-1.5 backdrop-blur-xl border border-zinc-800">
            <TabsTrigger value="ytlink" className="rounded-xl px-8 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-lg">
              Youtube link
            </TabsTrigger>
            <TabsTrigger value="upload" className="rounded-xl px-8 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-lg">
              Upload Video
            </TabsTrigger>
            <TabsTrigger value="subtitle" className="rounded-xl px-8 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-lg">
              Burn Subtitles
            </TabsTrigger>
            <TabsTrigger value="clips" className="rounded-xl px-8 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-lg">
              My Clips
            </TabsTrigger>
            <TabsTrigger value="content">
  Content Studio
</TabsTrigger>
          </TabsList>

          
          <TabsContent value="ytlink" className="mt-10">
<Card className="border border-zinc-800 bg-zinc-950/50">
  <CardContent className="p-8">

    <div className="mb-6 flex items-center gap-4">
      <div className="rounded-xl bg-red-500/10 p-3">
        <Youtube className="h-8 w-8 text-red-500" />
      </div>

      <div>
        <h3 className="text-xl font-semibold">
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
        className="h-14 border-zinc-700 bg-zinc-900"
      />

      <Button
        size="lg"
        onClick={handleYoutubeProcess}
        disabled={youtubeLoading}
        className="h-14 bg-gradient-to-r from-red-600 to-red-500"
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

    <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-500">
      <span>✓ YouTube Podcasts</span>
      <span>•</span>
      <span>✓ Interviews</span>
      <span>•</span>
      <span>✓ Long-form Videos</span>
      <span>•</span>
      <span>✓ Automatic Clip Detection</span>
    </div>

  </CardContent>
</Card>
</TabsContent>
          {/* Upload Tab */}
          <TabsContent value="upload" className="mt-10">
            {/* YouTube URL Section */}

            <Card className="border-0 bg-zinc-900/70 backdrop-blur-2xl">
              <CardHeader className="pb-8">
                <CardTitle className="text-3xl">Create Viral Clips</CardTitle>
                <CardDescription className="text-lg text-zinc-400">
                  Upload your long-form video. Our AI will detect engaging moments and generate vertical reels.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-10">
                {/* Upload Zone */}
                <div
                  {...getRootProps()}
                  className={`
                    group relative flex h-80 cursor-pointer flex-col items-center justify-center
                    rounded-3xl border border-dashed border-zinc-700 transition-all duration-300
                    hover:border-violet-500 hover:bg-zinc-900/50
                    ${isDragActive ? "border-violet-500 bg-zinc-900/80 scale-[1.01]" : ""}
                    ${uploading ? "pointer-events-none opacity-70" : ""}
                  `}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center">
                    <div className="mb-6 rounded-2xl bg-zinc-800 p-6 group-hover:bg-violet-500/10 transition-colors">
                      <Video className="h-16 w-16 text-zinc-400 group-hover:text-violet-400 transition-colors" />
                    </div>
                    <p className="text-2xl font-medium">Drop your video here</p>
                    <p className="mt-2 text-zinc-500">MP4, MOV, AVI • Max 500MB</p>
                  </div>
                </div>

                {files.length > 0 && (
                  <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                    <div>
                      <p className="font-medium text-lg">{files[0]?.name}</p>
                      <p className="text-sm text-zinc-500">
                        {(files[0]?.size / (1024 * 1024)).toFixed(1)} MB
                      </p>
                    </div>
                    <Button onClick={handleUpload} size="lg" disabled={uploading} className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:brightness-110">
                      {uploading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Generating Clips...
                        </>
                      ) : (
                        "Generate Viral Clips"
                      )}
                    </Button>
                  </div>
                )}

                {/* Processing Status */}
                {regularUploads.length > 0 && (
                  <div>
                    <div className="mb-6 flex items-center justify-between">
                      <h3 className="text-2xl font-semibold">Recent Uploads</h3>
                      <Button
                        variant="outline"
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="border-zinc-700 hover:bg-zinc-800"
                      >
                        {refreshing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Refresh Status
                      </Button>
                    </div>

                    <div className="rounded-3xl border border-zinc-800 overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-zinc-800 hover:bg-transparent">
                            <TableHead className="py-4">Video</TableHead>
                            <TableHead>Uploaded</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Clips Generated</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {regularUploads.map((item) => (
                            <TableRow
                              key={item.id}
                              className="cursor-pointer border-zinc-800 hover:bg-zinc-900/50"
                              onClick={() => setSelectedFileId(item.id)}
                            >
                              <TableCell className="font-medium py-4">{item.filename}</TableCell>
                              <TableCell className="text-zinc-400">
                                {new Date(item.createdAt).toLocaleDateString()} • {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </TableCell>
                              <TableCell>{getStatusBadge(item.status)}</TableCell>
                              <TableCell className="text-right font-semibold text-emerald-400">
                                {item.clipsCount || "0"}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subtitle Tab */}
          <TabsContent value="subtitle" className="mt-10">
            <SubtitleStudio
              subtitleFiles={subtitleFiles}
              setSubtitleFiles={setSubtitleFiles}
              subtitleUploading={subtitleUploading}
              onBurnSubtitles={handleSubtitleUpload}
    subtitleBurns={subtitleBurns}
    refreshing={refreshing}
    onRefresh={handleRefresh}
    getStatusBadge={getStatusBadge}
    setSelectedFileId={setSelectedFileId}
  />
          </TabsContent>

          {/* Clips Tab */}
          <TabsContent value="clips" className="mt-10">
            <Card className="border-0 bg-zinc-900/70 backdrop-blur-2xl">
              <CardHeader>
                <CardTitle className="text-3xl">Your Generated Clips</CardTitle>
                <CardDescription className="text-lg text-zinc-400">
                  Ready-to-post vertical content created by AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ClipDisplay clips={clips} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="content" className="mt-10">
  <div className="grid gap-6">

    {/* Titles */}

    <Card className="border-zinc-800 bg-zinc-900/70">
      <CardHeader>
        <CardTitle>🔥 AI Title Generator</CardTitle>
        <CardDescription>
          Ready-to-use viral titles
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {titles.map((title, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-4"
          >
            <span>{title}</span>

            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                navigator.clipboard.writeText(title);
                toast.success("Title copied");
              }}
            >
              Copy
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>

    {/* Hashtags */}

    <Card className="border-zinc-800 bg-zinc-900/70">
      <CardHeader>
        <CardTitle># Hashtag Generator</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          {hashtags.map((tag) => (
            <Badge
              key={tag}
              className="cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(tag);
                toast.success("Hashtag copied");
              }}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>

    {/* Thumbnail Ideas */}

    <Card className="border-zinc-800 bg-zinc-900/70">
  <CardHeader>
    <CardTitle>🎨 AI Thumbnail Generator</CardTitle>
    <CardDescription>
      Generate YouTube-ready thumbnails using AI
    </CardDescription>
  </CardHeader>

  <CardContent>

    <Button
      onClick={generateThumbnail}
      disabled={thumbnailLoading}
      className="mb-6"
    >
      {thumbnailLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        "Generate Thumbnails"
      )}
    </Button>

    <div className="grid gap-4 md:grid-cols-2">
      {generatedThumbnails.map((image, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-xl border border-zinc-800"
        >
          <img
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className="w-full"
          />

          <div className="p-3">
            <Button className="w-full">
              Download
            </Button>
          </div>
        </div>
      ))}
    </div>

  </CardContent>
</Card>

    {/* Captions */}

    <Card className="border-zinc-800 bg-zinc-900/70">
      <CardHeader>
        <CardTitle>✍️ Caption Generator</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {captions.map((caption, index) => (
          <div
            key={index}
            className="rounded-xl border border-zinc-800 bg-zinc-950 p-4"
          >
            <pre className="whitespace-pre-wrap text-sm text-zinc-300 font-sans">
              {caption}
            </pre>

            <Button
              className="mt-4"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(caption);
                toast.success("Caption copied");
              }}
            >
              Copy Caption
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>

    {/* SEO */}

    <Card className="border-zinc-800 bg-zinc-900/70">
      <CardHeader>
        <CardTitle>🚀 SEO Package</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">

        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
          <p className="font-medium mb-2">
            Suggested Keywords
          </p>

          <div className="flex flex-wrap gap-2">
            {[
              "podcast",
              "business",
              "startup",
              "entrepreneur",
              "motivation",
              "success",
              "viral clips",
              "podcast shorts",
            ].map((keyword) => (
              <Badge key={keyword}>
                {keyword}
              </Badge>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>

  </div>
</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}