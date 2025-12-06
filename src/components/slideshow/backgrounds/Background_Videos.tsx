"use client";

import { Background_Panel } from "@/components/slideshow/backgrounds/Background_Panel";
import { Scrolling_Background_Snippets } from "@/components/slideshow/backgrounds/Scrolling_Background_Snippets";
import React from "react";

export function Background_Videos() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900" />
      <Scrolling_Background_Snippets />
      <Background_Panel className={"bg-black/60"} />
    </div>
  );
}
