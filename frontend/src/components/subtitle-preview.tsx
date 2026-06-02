"use client";

import type { SubtitleStyle } from "./subtitle-types";


interface Props {
  style: SubtitleStyle;
}

export function SubtitlePreview({ style }: Props) {
  return (
    <div className="relative aspect-[9/16] w-full rounded-3xl overflow-hidden bg-black border border-zinc-800">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black" />

      <div
        className={`
          absolute left-1/2
          -translate-x-1/2
          w-[90%]
          text-center
          ${
            style.position === "top"
              ? "top-16"
              : style.position === "middle"
              ? "top-1/2 -translate-y-1/2"
              : "bottom-16"
          }
        `}
      >
        <span
          style={{
            fontSize: `${style.fontSize / 2}px`,
            color: style.textColor,
            fontFamily: style.fontFamily,
            fontWeight: style.fontWeight,
            textShadow: style.shadowEnabled
              ? `0px 0px ${style.shadowBlur}px ${style.shadowColor}`
              : undefined,
          }}
        >
          THIS IS A{" "}
          <span style={{ color: style.highlightColor }}>
            VIRAL
          </span>{" "}
          PODCAST CLIP
        </span>
      </div>
    </div>
  );
}