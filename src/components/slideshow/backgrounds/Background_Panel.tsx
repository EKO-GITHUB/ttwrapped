import { cn } from "@/lib/utils";
import React from "react";

export function Background_Panel({ className }: { className?: string }) {
  return (
    <div className="absolute inset-0 h-[90%] w-[85%] translate-x-[10%] translate-y-[5%] overflow-hidden rounded-xl">
      <div className={cn("absolute top-0 h-full w-full", className)}></div>
    </div>
  );
}
