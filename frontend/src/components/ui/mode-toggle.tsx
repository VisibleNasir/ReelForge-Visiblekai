"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./button";

export function ModeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = resolvedTheme ?? theme;
  const isDark = currentTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  if (!mounted) {
    return <div className="h-10 w-10" aria-hidden="true" />;
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      className="relative rounded-full h-10 w-10"
      onClick={toggleTheme}
    >
      <Sun
        className={`absolute h-5 w-5 transition-all duration-300 ${
          isDark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
        }`}
      />
      <Moon
        className={`absolute h-5 w-5 transition-all duration-300 ${
          isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
