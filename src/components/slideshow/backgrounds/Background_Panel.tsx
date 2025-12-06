import { cn } from "@/lib/utils";
import React from "react";

export function Background_Panel({ bg_color }: { bg_color: "slate" | "teal" }) {
  return (
    <div className="absolute inset-0 h-[90%] w-[85%] translate-x-[10%] translate-y-[5%] overflow-hidden rounded-xl">
      <div
        className={cn(
          "absolute top-0 h-full w-full",
          bg_color == "slate" && "bg-slate-800",
          bg_color == "teal" && "bg-teal-900",
        )}
      ></div>
    </div>
  );
}
