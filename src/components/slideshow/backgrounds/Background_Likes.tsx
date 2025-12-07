"use client";

import { useCanvasAnimation } from "@/components/slideshow/backgrounds/useCanvasAnimation";
import React, { useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotation_speed: number;
  size: number;
  color: string;
  shape: "circle" | "square" | "triangle" | "heart";
  opacity: number;
  lifetime: number;
  max_lifetime: number;
};

export function Background_Likes() {
  const particles_ref = useRef<Particle[]>([]);
  const has_burst_ref = useRef(false);
  const last_emission_ref = useRef<number>(0);

  const draw = (ctx: CanvasRenderingContext2D, timestamp: number) => {
    const canvas = ctx.canvas;

    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const particles = particles_ref.current;
    const gravity = 0.3;
    const friction = 0.99;
    const colors = ["#FF0050", "#00F2EA", "#FE2C55", "#25F4EE", "#FFFFFF", "#FFD700"];

    const create_particle = (x: number, y: number, burst: boolean = false): Particle => {
      const angle = burst ? Math.random() * Math.PI * 2 : Math.PI / 2 + (Math.random() - 0.5) * 0.3;
      const speed = burst ? Math.random() * 8 + 4 : Math.random() * 2 + 1;

      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (burst ? Math.random() * 5 : 0),
        rotation: Math.random() * Math.PI * 2,
        rotation_speed: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape:
          Math.random() > 0.3 ? (["circle", "square", "triangle"] as const)[Math.floor(Math.random() * 3)] : "heart",
        opacity: 1,
        lifetime: 0,
        max_lifetime: Math.random() * 180 + 120,
      };
    };

    if (!has_burst_ref.current) {
      const burst_count = 80;
      const center_x = canvas.width / 2;
      const center_y = canvas.height / 2;

      for (let i = 0; i < burst_count; i++) {
        particles.push(create_particle(center_x, center_y, true));
      }

      has_burst_ref.current = true;
    }

    const emission_interval = 300;
    if (timestamp - last_emission_ref.current > emission_interval) {
      const spawn_x = Math.random() * canvas.width;
      particles.push(create_particle(spawn_x, -20, false));
      last_emission_ref.current = timestamp;
    }

    const draw_heart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      const top_curve_height = size * 0.3;
      ctx.moveTo(0, top_curve_height);
      ctx.bezierCurveTo(size / 2, -size / 3, size, top_curve_height, 0, size);
      ctx.bezierCurveTo(-size, top_curve_height, -size / 2, -size / 3, 0, top_curve_height);
      ctx.fill();
      ctx.restore();
    };

    const draw_particle = (p: Particle) => {
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      switch (p.shape) {
        case "circle":
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
          break;
        case "square":
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          break;
        case "triangle":
          ctx.beginPath();
          ctx.moveTo(0, -p.size / 2);
          ctx.lineTo(p.size / 2, p.size / 2);
          ctx.lineTo(-p.size / 2, p.size / 2);
          ctx.closePath();
          ctx.fill();
          break;
        case "heart":
          ctx.translate(-p.size / 2, -p.size / 2);
          draw_heart(ctx, p.size / 2, 0, p.size * 0.4, 0);
          break;
      }

      ctx.restore();
    };

    const update_particles = () => {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vy += gravity;
        p.vx *= friction;
        p.vy *= friction;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotation_speed;
        p.lifetime += 1;
        p.opacity = 1 - p.lifetime / p.max_lifetime;

        if (p.lifetime >= p.max_lifetime || p.y > canvas.height + 50) {
          particles.splice(i, 1);
        }
      }
    };

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update_particles();
    particles.forEach(draw_particle);
  };

  const { canvasRef } = useCanvasAnimation(draw);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700"
    />
  );
}
