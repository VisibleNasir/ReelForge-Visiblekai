"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative h-10 w-10 p-0"
    >
      <Sun
        className={`
          absolute h-5 w-5 transition-all duration-300 
          ${theme === "dark" ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"}
        `}
      />
      <Moon
        className={`
          absolute h-5 w-5 transition-all duration-300
          ${theme === "dark" ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"}
        `}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
