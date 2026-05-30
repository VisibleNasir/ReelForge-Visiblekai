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
import { Loader2, Upload } from "lucide-react";
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

      toast.success("Burned subtitles started", {
        description: "We will refresh once the burned version is ready.",
        duration: 6000,
      });
    } catch (err) {
      toast.error("Subtitle upload failed", {
        description:
          err instanceof Error ? err.message : "An unexpected error occurred.",
      });
    } finally {
      setSubtitleUploading(false);
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

  const regularUploads = uploadedFiles.filter(file => file.s3Key.includes('/original.'));
  const subtitleBurns = uploadedFiles.filter(file => file.s3Key.includes('/subtitle.'));


  return (
    <div className="h-full bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        

        <Tabs defaultValue="upload" >
          <TabsList className="grid w-full max-w-sm grid-cols-3 bg-zinc-100 p-1 dark:bg-zinc-900">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="subtitle">Burn subtitle</TabsTrigger>
            <TabsTrigger value="clips">Clips</TabsTrigger>
          </TabsList>

          
          <TabsContent value="upload" >
            <Card className="border-zinc-200 dark:border-zinc-950">
              <CardHeader className="space-y-1">
                <CardTitle>Upload Video</CardTitle>
                <CardDescription>
                  Upload your podcast or long form video, and we will create vertical Content/Reels for you detecting viral movements. 
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-2">
                <div
                  {...getRootProps()}
                  className={`
                    flex cursor-pointer flex-col items-center justify-center
                     border-2  p-4 text-center transition
                    ${isDragActive
                      ? "border-zinc-900 bg-zinc-100 dark:border-white dark:bg-zinc-900"
                      : "border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"}
                    ${uploading ? "pointer-events-none opacity-60" : ""}
                  `}
                >
                  <input {...getInputProps()} />
                  <Upload className="mb-4 h-14 w-14 text-zinc-400" />
                  <p className="text-base font-medium">
                    Drag & drop your video here
                  </p>
                  <p className="mt-1 text-sm text-zinc-500">
                    MP4 - up to 500MB
                  </p>
                </div>

                {files.length > 0 && (
                  <div className="flex items-center justify-between rounded-xl border bg-zinc-100 p-5 dark:bg-zinc-900">
                    <div className="truncate">
                      <p className="font-medium">{files[0]?.name}</p>
                      <p className="text-sm text-zinc-500">
                        {(files[0]?.size / (1024 * 1024)).toFixed(1)} MB
                      </p>
                    </div>

                    <Button onClick={handleUpload} disabled={uploading}>
                      {uploading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing
                        </>
                      ) : (
                        "Generate Clips"
                      )}
                    </Button>
                  </div>
                )}

                {regularUploads.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        Processing Status
                      </h3>
                      <Button
                        variant="default"
                        onClick={handleRefresh}
                        disabled={refreshing}
                      >
                        {refreshing && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Refresh
                      </Button>
                    </div>

                    <div className="overflow-hidden  ">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>File</TableHead>
                            <TableHead>Uploaded</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">
                              Clips
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {regularUploads.map((item) => (
                            <TableRow
                              key={item.id}
                              className="cursor-pointer"
                              onClick={() => setSelectedFileId(item.id)}
                            >
                              <TableCell className="max-w-xs truncate font-medium">
                                {item.filename}
                              </TableCell>
                              <TableCell className="text-zinc-500">
                                {new Date(item.createdAt).toLocaleString()}
                              </TableCell>
                              <TableCell>
                                {getStatusBadge(item.status)}
                              </TableCell>
                              <TableCell className="text-right">
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

          <TabsContent value="subtitle">
            <div className="space-y-8">
              <Card className="border-zinc-200 dark:border-zinc-800">
                <CardHeader className="space-y-1">
                  <CardTitle>Burn Subtitles</CardTitle>
                  <CardDescription>
                    Upload a video to generate a burned-in subtitle version.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div
                    {...getSubtitleRootProps()}
                    className={`
                      flex cursor-pointer flex-col items-center justify-center
                       border-2 p-10 text-center transition
                      ${isSubtitleDragActive
                        ? "border-zinc-900 bg-zinc-100 dark:border-white dark:bg-zinc-900"
                        : "border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"}
                      ${subtitleUploading ? "pointer-events-none opacity-60" : ""}
                    `}
                  >
                    <input {...getSubtitleInputProps()} />
                    <Upload className="mb-4 h-12 w-12 text-zinc-400" />
                    <p className="text-base font-medium">Drop a video to burn subtitles</p>
                    <p className="mt-1 text-sm text-zinc-500">MP4 - up to 500MB</p>
                  </div>

                  {subtitleFiles.length > 0 && (
                    <div className="flex items-center justify-between rounded-xl border bg-zinc-100 p-5 dark:bg-zinc-900">
                      <div className="truncate">
                        <p className="font-medium">{subtitleFiles[0]?.name}</p>
                        <p className="text-sm text-zinc-500">
                          {(subtitleFiles[0]?.size / (1024 * 1024)).toFixed(1)} MB
                        </p>
                      </div>

                      <Button onClick={handleSubtitleUpload} disabled={subtitleUploading}>
                        {subtitleUploading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Burning
                          </>
                        ) : (
                          "Burn Subtitles"
                        )}
                      </Button>
                    </div>
                  )}

                  {subtitleBurns.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">
                          Burned Subtitle Videos
                        </h3>
                        <Button
                          variant="outline"
                          onClick={handleRefresh}
                          disabled={refreshing}
                        >
                          {refreshing && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          Refresh
                        </Button>
                      </div>

                      <div className="overflow-hidden rounded-xl border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>File</TableHead>
                              <TableHead>Uploaded</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">
                                Result
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {subtitleBurns.map((item) => (
                              <TableRow
                                key={item.id}
                                className="cursor-pointer"
                                onClick={() => setSelectedFileId(item.id)}
                              >
                                <TableCell className="max-w-xs truncate font-medium">
                                  {item.filename}
                                </TableCell>
                                <TableCell className="text-zinc-500">
                                  {new Date(item.createdAt).toLocaleString()}
                                </TableCell>
                                <TableCell>
                                  {getStatusBadge(item.status)}
                                </TableCell>
                                <TableCell className="text-right">
                                  {item.clipsCount || "—"}
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
            </div>
          </TabsContent>

          <TabsContent value="clips">
            <Card>
              <CardHeader>
                <CardTitle>Your Clips</CardTitle>
                <CardDescription>
                  AI-generated clips with subtitles, ready to publish.
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