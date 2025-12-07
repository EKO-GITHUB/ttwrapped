"use client";

import React, { useEffect, useRef } from "react";

type Floating_Shape = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotation_speed: number;
  opacity: number;
};

export function Background_Overview() {
  const canvas_ref = useRef<HTMLCanvasElement>(null);

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

    const shapes: Floating_Shape[] = [];
    let animation_frame: number;

    const colors = ["#FF6B9D", "#4ECDC4", "#A29BFE", "#74B9FF", "#55E6C1"];

    for (let i = 0; i < 8; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 60 + Math.random() * 80,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotation_speed: (Math.random() - 0.5) * 0.01,
        opacity: 0.15 + Math.random() * 0.1,
      });
    }

    const draw_shape = (shape: Floating_Shape) => {
      ctx.save();
      ctx.globalAlpha = shape.opacity;
      ctx.translate(shape.x, shape.y);
      ctx.rotate(shape.rotation);

      const gradient = ctx.createLinearGradient(-shape.size, -shape.size, shape.size, shape.size);
      gradient.addColorStop(0, shape.color);
      gradient.addColorStop(1, `${shape.color}00`);

      ctx.fillStyle = gradient;
      ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);

      ctx.restore();
    };

    const update_shape = (shape: Floating_Shape) => {
      shape.x += shape.vx;
      shape.y += shape.vy;
      shape.rotation += shape.rotation_speed;

      if (shape.x < -shape.size) shape.x = canvas.width + shape.size;
      if (shape.x > canvas.width + shape.size) shape.x = -shape.size;
      if (shape.y < -shape.size) shape.y = canvas.height + shape.size;
      if (shape.y > canvas.height + shape.size) shape.y = -shape.size;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapes.forEach((shape) => {
        update_shape(shape);
        draw_shape(shape);
      });

      animation_frame = requestAnimationFrame(animate);
    };

    animation_frame = requestAnimationFrame(animate);
    window.addEventListener("resize", resize_canvas);

    return () => {
      cancelAnimationFrame(animation_frame);
      window.removeEventListener("resize", resize_canvas);
    };
  }, []);

  return (
    <canvas
      ref={canvas_ref}
      className="fixed inset-0 -z-10 bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950"
    />
  );
}
