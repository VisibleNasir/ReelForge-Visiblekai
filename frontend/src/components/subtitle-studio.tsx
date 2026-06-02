"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Sparkles, Loader2, Check } from "lucide-react";

import { Button } from "./ui/button";
import { subtitlePresets } from "./subtitle-presets";
import { SubtitlePreview } from "./subtitle-preview";

export function SubtitleStudio({
  subtitleFiles,
  setSubtitleFiles,
  subtitleUploading,
  onBurnSubtitles,
}: any) {
  const [style, setStyle] = useState(subtitlePresets[0]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop: (acceptedFiles) => setSubtitleFiles(acceptedFiles),
    accept: {
      "video/*": [".mp4", ".mov", ".avi"],
    },
    maxFiles: 1,
    maxSize: 500 * 1024 * 1024,
    disabled: subtitleUploading,
  });

  return (
    <div className="space-y-8">
      {/* Stepper */}

      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl p-6">
        <div className="grid grid-cols-5 gap-4">
          {[
            "Upload Video",
            "Generate Transcript",
            "Customize",
            "Preview",
            "Export",
          ].map((step, index) => (
            <div
              key={step}
              className="flex items-center gap-3"
            >
              <div
                className={`
                  flex h-10 w-10 items-center justify-center rounded-full
                  ${
                    subtitleFiles.length > 0 || index === 0
                      ? "bg-violet-600"
                      : "bg-zinc-800"
                  }
                `}
              >
                {subtitleFiles.length > 0 || index === 0 ? (
                  <Check className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>

              <span className="hidden lg:block text-sm text-zinc-300">
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Area */}

      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl p-8">
        <h2 className="text-2xl font-bold mb-2">
          Upload Video
        </h2>

        <p className="text-zinc-400 mb-6">
          Upload a video and customize subtitles before burning them.
        </p>

        <div
          {...getRootProps()}
          className={`
            group relative flex h-72 cursor-pointer flex-col items-center justify-center
            rounded-3xl border border-dashed border-zinc-700
            transition-all duration-300
            hover:border-fuchsia-500 hover:bg-zinc-900/60
            ${
              isDragActive
                ? "border-fuchsia-500 bg-zinc-900/80 scale-[1.01]"
                : ""
            }
          `}
        >
          <input {...getInputProps()} />

          <div className="rounded-2xl bg-zinc-800 p-5 mb-5">
            <Upload className="h-12 w-12 text-zinc-400" />
          </div>

          <p className="text-xl font-semibold">
            Drop video to burn subtitles
          </p>

          <p className="text-zinc-500 mt-2">
            MP4, MOV, AVI • Max 500MB
          </p>
        </div>

        {subtitleFiles.length > 0 && (
          <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  {subtitleFiles[0]?.name}
                </p>

                <p className="text-sm text-zinc-500">
                  {(
                    subtitleFiles[0]?.size /
                    (1024 * 1024)
                  ).toFixed(1)}{" "}
                  MB
                </p>
              </div>

              <div className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
                Uploaded
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Show editor only after upload */}

      {subtitleFiles.length > 0 && (
        <div className="grid lg:grid-cols-[420px_1fr] gap-8">
          {/* Left Panel */}

          <div className="space-y-6">
            {/* Templates */}

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6">
              <h3 className="font-semibold text-lg mb-4">
                Subtitle Templates
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {subtitlePresets.map((preset) => (
                  <button
                    key={preset.template}
                    onClick={() => setStyle(preset)}
                    className={`
                      rounded-xl border p-3 text-sm transition-all
                      ${
                        style.template === preset.template
                          ? "border-violet-500 bg-violet-500/10"
                          : "border-zinc-700 hover:border-violet-500"
                      }
                    `}
                  >
                    {preset.template}
                  </button>
                ))}
              </div>
            </div>

            {/* Typography */}

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6">
              <h3 className="font-semibold text-lg mb-4">
                Typography
              </h3>

              <label className="block text-sm text-zinc-400 mb-2">
                Font Size ({style.fontSize}px)
              </label>

              <input
                type="range"
                min={20}
                max={120}
                value={style.fontSize}
                onChange={(e) =>
                  setStyle({
                    ...style,
                    fontSize: Number(e.target.value),
                  })
                }
                className="w-full"
              />
            </div>

            {/* Colors */}

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6">
              <h3 className="font-semibold text-lg mb-4">
                Colors
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-zinc-400">
                    Text Color
                  </label>

                  <input
                    type="color"
                    value={style.textColor}
                    onChange={(e) =>
                      setStyle({
                        ...style,
                        textColor: e.target.value,
                      })
                    }
                    className="mt-2 block h-12 w-full rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-sm text-zinc-400">
                    Highlight Color
                  </label>

                  <input
                    type="color"
                    value={style.highlightColor}
                    onChange={(e) =>
                      setStyle({
                        ...style,
                        highlightColor: e.target.value,
                      })
                    }
                    className="mt-2 block h-12 w-full rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Export */}

            <Button
              size="lg"
              onClick={onBurnSubtitles}
              disabled={subtitleUploading}
              className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:brightness-110"
            >
              {subtitleUploading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Burning Subtitles...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Burn Subtitles
                </>
              )}
            </Button>
          </div>

          {/* Right Preview */}

          <div className="space-y-6">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6">
              <h3 className="font-semibold text-lg mb-4">
                Live Preview
              </h3>

              <SubtitlePreview style={style} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}