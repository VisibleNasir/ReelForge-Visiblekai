"use client";

import { useDropzone } from "react-dropzone";
import type { Clip } from "@prisma/client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Loader2, UploadCloud } from "lucide-react";
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
import { ModeToggle } from "./ui/mode-toggle";

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
  const [uploading, setUploading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  // Auto-refresh when files are processing
  useEffect(() => {
    const processingFiles = uploadedFiles.some(
      (f) => f.status === "processing" || f.status === "uploading"
    );

    if (processingFiles) {
      const interval = setInterval(() => {
        router.refresh();
      }, 5000); // Every 5 seconds for better UX

      return () => clearInterval(interval);
    }
  }, [uploadedFiles, router]);

  const handleRefresh = async () => {
    setRefreshing(true);
    router.refresh();
    setTimeout(() => setRefreshing(false), 800);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => setFiles(acceptedFiles),
    accept: { "video/*": [".mp4", ".mov", ".avi"] },
    maxSize: 500 * 1024 * 1024, // 500MB
    maxFiles: 1,
    disabled: uploading,
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

      setFiles([]);

      toast.success("Video uploaded and processing started", {
        description: "Your clips will appear shortly. We'll refresh automatically.",
        duration: 6000,
      });
    } catch (err) {
      toast.error("Upload failed", {
        description:
          err instanceof Error ? err.message : "An unexpected error occurred.",
      });
    } finally {
      setUploading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "uploading":
      case "queued":
        return <Badge variant="secondary">In Queue</Badge>;
      case "processing":
        return <Badge variant="secondary">Processing</Badge>;
      case "completed":
        return <Badge>Ready</Badge>;
      case "failed":
      case "no credits":
        return <Badge variant="destructive">{status === "no credits" ? "No Credits" : "Failed"}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Podcast Clipper</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Transform long-form podcasts into engaging short clips with AI
            </p>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link href="/dashboard/billing">
              <Button size="lg">Buy Credits</Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="upload" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="upload">Upload Video</TabsTrigger>
            <TabsTrigger value="my-clips">My Clips</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-8">
            <Card className="overflow-hidden">
              <CardHeader className="border-b bg-muted/40">
                <CardTitle>Upload a New Podcast</CardTitle>
                <CardDescription>
                  Drag and drop your video file or click to browse. Supports MP4, MOV, AVI up to 500MB.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8">
                <div
                  {...getRootProps()}
                  className={`
                    relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed 
                    p-12 text-center transition-colors cursor-pointer
                    ${isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/30 hover:border-primary/50 hover:bg-accent/50"}
                    ${uploading ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  <input {...getInputProps()} />
                  <UploadCloud className="h-16 w-16 text-muted-foreground mb-6" />
                  {isDragActive ? (
                    <p className="text-lg font-medium">Drop your video here</p>
                  ) : (
                    <>
                      <p className="text-lg font-medium">Drag & drop your video file here</p>
                      <p className="mt-2 text-sm text-muted-foreground">or click to select from your device</p>
                    </>
                  )}
                </div>

                {files.length > 0 && (
                  <div className="mt-8 rounded-lg border bg-muted/30 p-6">
                    <h4 className="font-medium mb-3">Selected file</h4>
                    <div className="flex items-center justify-between">
                      <div className="truncate">
                        <p className="font-medium">{files[0]?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(files[0]?.size / (1024 * 1024)).toFixed(1)} MB
                        </p>
                      </div>
                      <Button
                        size="lg"
                        onClick={handleUpload}
                        disabled={uploading}
                      >
                        {uploading ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Uploading & Processing...
                          </>
                        ) : (
                          "Upload & Generate Clips"
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {uploadedFiles.length > 0 && (
                  <div className="mt-10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">Processing Queue</h3>
                      <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
                        {refreshing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Refresh Status
                      </Button>
                    </div>

                    <div className="rounded-lg border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>File Name</TableHead>
                            <TableHead>Uploaded</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Clips Generated</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {uploadedFiles.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium truncate max-w-xs">
                                {item.filename}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {new Date(item.createdAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </TableCell>
                              <TableCell>{getStatusBadge(item.status)}</TableCell>
                              <TableCell className="text-right">
                                {item.clipsCount > 0 ? (
                                  <span className="font-medium">{item.clipsCount}</span>
                                ) : (
                                  <span className="text-muted-foreground">—</span>
                                )}
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

          <TabsContent value="my-clips">
            <Card>
              <CardHeader>
                <CardTitle>Your Generated Clips</CardTitle>
                <CardDescription>
                  All AI-generated clips from your uploaded podcasts. New clips appear automatically.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ClipDisplay clips={clips} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}