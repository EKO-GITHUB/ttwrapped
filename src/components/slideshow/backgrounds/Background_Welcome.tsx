"use client";

import { Background_Panel } from "@/components/slideshow/backgrounds/Background_Panel";
import { useCanvasAnimation } from "@/components/slideshow/backgrounds/useCanvasAnimation";
import React, { useRef } from "react";

const start_time = Date.now();

export function Background_Welcome() {
  const startTimeRef = useRef<number>(start_time);

  const draw = (ctx: CanvasRenderingContext2D) => {
    const canvas = ctx.canvas;
    const grid_size = 20;
    const dot_radius = 1.5;
    const animation_duration = 5000;

    const elapsed = Date.now() - startTimeRef.current;
    const progress = (elapsed % animation_duration) / animation_duration;

    const offset_x = -40 + 40 * progress;
    const offset_y = -40 + 40 * progress;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    for (let x = offset_x; x < canvas.width; x += grid_size) {
      for (let y = offset_y; y < canvas.height; y += grid_size) {
        ctx.beginPath();
        ctx.arc(x, y, dot_radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  const { canvasRef } = useCanvasAnimation(draw);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
      />

      <Background_Panel className="bg-slate-800" />
    </div>
  );
}
