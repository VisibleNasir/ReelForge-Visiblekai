import type { SubtitleStyle } from "./subtitle-types";


export const subtitlePresets: SubtitleStyle[] = [
  {
    template: "Classic White",
    fontFamily: "Inter",
    fontSize: 60,
    fontWeight: 700,

    textColor: "#ffffff",
    highlightColor: "#ffff00",
    backgroundColor: "transparent",

    outlineEnabled: true,
    outlineColor: "#000000",
    outlineWidth: 4,

    shadowEnabled: true,
    shadowColor: "#000000",
    shadowBlur: 8,

    position: "bottom",

    animation: "fade",

    highlightMode: "word",
  },

  {
    template: "Alex Hormozi Style",
    fontFamily: "Anton",
    fontSize: 72,
    fontWeight: 900,

    textColor: "#ffffff",
    highlightColor: "#ffd500",
    backgroundColor: "transparent",

    outlineEnabled: true,
    outlineColor: "#000000",
    outlineWidth: 8,

    shadowEnabled: false,
    shadowColor: "#000000",
    shadowBlur: 0,

    position: "bottom",

    animation: "pop",

    highlightMode: "word",
  },

  {
    template: "MrBeast Style",
    fontFamily: "Bebas Neue",
    fontSize: 80,
    fontWeight: 900,

    textColor: "#ffffff",
    highlightColor: "#00eaff",
    backgroundColor: "transparent",

    outlineEnabled: true,
    outlineColor: "#000000",
    outlineWidth: 10,

    shadowEnabled: true,
    shadowColor: "#000000",
    shadowBlur: 12,

    position: "middle",

    animation: "bounce",

    highlightMode: "karaoke",
  },
];