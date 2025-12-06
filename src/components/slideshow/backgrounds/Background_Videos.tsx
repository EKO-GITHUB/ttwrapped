"use client";

import { Scrolling_Background_Snippets } from "@/components/slideshow/backgrounds/Scrolling_Background_Snippets";
import React from "react";

export function Background_Videos() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br" />
      <Scrolling_Background_Snippets />
    </div>
  );
}
