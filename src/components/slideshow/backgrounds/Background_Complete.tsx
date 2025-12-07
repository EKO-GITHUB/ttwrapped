"use client";

import { useData_store } from "@/stores/useData_store";
import React, { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  base_x: number;
  base_y: number;
  size: number;
  brightness: number;
  twinkle_phase: number;
  twinkle_speed: number;
  depth: number;
};

export function Background_Complete() {
  const canvas_ref = useRef<HTMLCanvasElement>(null);
  const is_exporting = useData_store((state) => state.is_exporting);

  useEffect(() => {
    const canvas = canvas_ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize_canvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize_canvas();

    let animation_frame: number;
    let frame_count = is_exporting ? 100 : 0;

    const stars: Star[] = [];

    for (let i = 0; i < 200; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const depth = Math.random();

      stars.push({
        x: is_exporting ? x + depth * 0.05 * 100 : x,
        y,
        base_x: x,
        base_y: y,
        size: Math.random() * 1.5 + 0.5,
        brightness: Math.random() * 0.5 + 0.5,
        twinkle_phase: is_exporting ? Math.random() * Math.PI * 2 * 10 : Math.random() * Math.PI * 2,
        twinkle_speed: 0.01 + Math.random() * 0.02,
        depth,
      });
    }

    const draw_star = (star: Star) => {
      const twinkle = Math.sin(frame_count * star.twinkle_speed + star.twinkle_phase) * 0.3 + 0.7;
      const opacity = star.brightness * twinkle;

      ctx.save();
      ctx.globalAlpha = opacity;

      const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3);
      gradient.addColorStop(0, "#FFFFFF");
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.3)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const update_stars = () => {
      stars.forEach((star) => {
        const drift_speed = star.depth * 0.05;
        star.x += drift_speed;

        if (star.x > canvas.width + 10) {
          star.x = -10;
          star.base_x = star.x;
        }
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame_count++;

      update_stars();
      stars.forEach(draw_star);

      animation_frame = requestAnimationFrame(animate);
    };

    animation_frame = requestAnimationFrame(animate);
    window.addEventListener("resize", resize_canvas);

    return () => {
      cancelAnimationFrame(animation_frame);
      window.removeEventListener("resize", resize_canvas);
    };
  }, [is_exporting]);

  return (
    <canvas
      ref={canvas_ref}
      className="absolute inset-0 bg-gradient-to-b from-slate-950 via-indigo-950 to-purple-950"
    />
  );
}
