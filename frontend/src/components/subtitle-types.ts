export interface SubtitleStyle {
  template: string;

  fontFamily: string;
  fontSize: number;
  fontWeight: number;

  textColor: string;
  highlightColor: string;
  backgroundColor: string;

  outlineEnabled: boolean;
  outlineColor: string;
  outlineWidth: number;

  shadowEnabled: boolean;
  shadowColor: string;
  shadowBlur: number;

  position: "top" | "middle" | "bottom";

  animation:
    | "fade"
    | "pop"
    | "bounce"
    | "slideUp"
    | "slideDown"
    | "scale"
    | "typewriter"
    | "none";

  highlightMode:
    | "word"
    | "phrase"
    | "karaoke"
    | "none";
}