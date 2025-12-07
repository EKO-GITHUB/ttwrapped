"use client";

import { Background_Panel } from "@/components/slideshow/backgrounds/Background_Panel";
import React, { useEffect, useRef } from "react";

export function Background_Welcome() {
  const canvas_ref = useRef<HTMLCanvasElement>(null);
  const animation_frame_ref = useRef<number>(0);

  useEffect(() => {
    const canvas = canvas_ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize_canvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize_canvas();
    window.addEventListener("resize", resize_canvas);

    const grid_size = 20;
    const dot_radius = 1.5;
    const animation_duration = 5000;
    const start_time = Date.now();

    const animate = () => {
      const elapsed = Date.now() - start_time;
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

      animation_frame_ref.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize_canvas);
      if (animation_frame_ref.current) {
        cancelAnimationFrame(animation_frame_ref.current);
      }
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <canvas
        ref={canvas_ref}
        className="absolute inset-0 h-full w-full"
      />

      <Background_Panel className={"bg-slate-800"} />
    </div>
  );
}
