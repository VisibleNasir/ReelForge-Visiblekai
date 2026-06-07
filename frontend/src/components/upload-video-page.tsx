"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { processVideo } from "~/actions/generation";
import { DashboardLayout } from "./dashboard-layout";
import { Button } from "./ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import { Badge } from "./ui/badge";
import { FileUpload } from "./ui/file-upload";

type UploadedFile = {
  id: string;
  s3Key: string;
  filename: string;
  status: string;
  clipsCount: number;
  createdAt: Date;
};

export function UploadVideoPage({
  uploadedFiles,
}: {
  uploadedFiles: UploadedFile[];
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const router = useRouter();

  const regularUploads = uploadedFiles.filter((file) =>
    file.s3Key.includes("/original.")
  );

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

  const handleFileUpload = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    router.refresh();
    setTimeout(() => setRefreshing(false), 800);
  };

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
        throw new Error(
          errorData.error || `Upload failed: ${uploadResponse.status}`
        );
      }

      const { uploadedFileId } = await uploadResponse.json();

      await processVideo(uploadedFileId);

      setFiles([]);

      toast.success("Video uploaded successfully", {
        description: "AI is now processing your video.",
      });

      router.refresh();
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
        return <Badge variant="secondary">Queued</Badge>;
      case "processing":
        return <Badge variant="secondary">Processing</Badge>;
      case "completed":
        return <Badge className="bg-emerald-500">Ready</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "no credits":
        return <Badge variant="destructive">No Credits</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
      <Card className="border-0 bg-zinc-900/70 backdrop-blur-2xl">
        <CardHeader className="pb-8">
          <CardTitle className="text-3xl">Create Viral Clips</CardTitle>
          <CardDescription className="text-lg text-zinc-400">
            Upload your long-form video. AI will process your video.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-10">
          <div className="mx-auto w-full max-w-4xl rounded-3xl border border-dashed border-zinc-700 bg-zinc-950">
            <FileUpload onChange={handleFileUpload} />
          </div>

          {files.length > 0 && (
            <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <div>
                <p className="text-lg font-medium">{files[0]?.name}</p>
                <p className="text-sm text-zinc-500">
                  {((files[0]?.size ?? 0) / (1024 * 1024)).toFixed(1)} MB
                </p>
              </div>

              <Button
                onClick={handleUpload}
                size="lg"
                disabled={uploading}
                className="bg-gradient-to-r from-violet-600 to-fuchsia-600"
              >
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Process Video"
                )}
              </Button>
            </div>
          )}

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
                  {refreshing && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Refresh Status
                </Button>
              </div>

              <div className="overflow-hidden rounded-3xl border border-zinc-800">
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-800 hover:bg-transparent">
                      <TableHead>Video</TableHead>
                      <TableHead>Uploaded</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">
                        Clips Generated
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {regularUploads.map((item) => (
                      <TableRow
                        key={item.id}
                        className="border-zinc-800 hover:bg-zinc-900/50"
                      >
                        <TableCell className="font-medium">
                          {item.filename}
                        </TableCell>

                        <TableCell className="text-zinc-400">
                          {new Date(item.createdAt).toLocaleDateString()} •{" "}
                          {new Date(item.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
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
  );
}