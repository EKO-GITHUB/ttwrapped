"use client";

import React, { useEffect, useRef } from "react";

type Share_Burst = {
  x: number;
  y: number;
  rings: Share_Ring[];
  color: string;
  next_ring_time: number;
};

type Share_Ring = {
  radius: number;
  opacity: number;
  max_radius: number;
  speed: number;
};

type Share_Arrow = {
  x: number;
  y: number;
  angle: number;
  speed: number;
  distance: number;
  max_distance: number;
  opacity: number;
  color: string;
  size: number;
};

export function Background_Shares() {
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

    const share_bursts: Share_Burst[] = [];
    const share_arrows: Share_Arrow[] = [];
    let animation_frame: number;
    let frame_count = 0;

    const colors = [
      "#FF6B9D",
      "#4ECDC4",
      "#45B7D1",
      "#FFA07A",
      "#A29BFE",
      "#FD79A8",
      "#74B9FF",
      "#55E6C1",
      "#F8B500",
      "#FC427B",
    ];

    const create_share_burst = (x?: number, y?: number): Share_Burst => {
      return {
        x: x ?? Math.random() * canvas.width,
        y: y ?? Math.random() * canvas.height,
        rings: [],
        color: colors[Math.floor(Math.random() * colors.length)],
        next_ring_time: 0,
      };
    };

    const create_share_arrow = (burst: Share_Burst): Share_Arrow => {
      const angle = Math.random() * Math.PI * 2;
      return {
        x: burst.x,
        y: burst.y,
        angle,
        speed: 2 + Math.random() * 2,
        distance: 0,
        max_distance: 150 + Math.random() * 100,
        opacity: 1,
        color: burst.color,
        size: 15 + Math.random() * 10,
      };
    };

    for (let i = 0; i < 6; i++) {
      share_bursts.push(create_share_burst());
    }

    const draw_share_ring = (ring: Share_Ring, x: number, y: number, color: string) => {
      ctx.save();
      ctx.globalAlpha = ring.opacity;

      const gradient = ctx.createRadialGradient(x, y, ring.radius * 0.8, x, y, ring.radius);
      gradient.addColorStop(0, `${color}00`);
      gradient.addColorStop(0.5, `${color}80`);
      gradient.addColorStop(1, `${color}00`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x, y, ring.radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = `${color}40`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(x, y, ring.radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    };

    const draw_share_arrow = (arrow: Share_Arrow) => {
      ctx.save();

      const current_x = arrow.x + Math.cos(arrow.angle) * arrow.distance;
      const current_y = arrow.y + Math.sin(arrow.angle) * arrow.distance;

      ctx.globalAlpha = arrow.opacity;
      ctx.translate(current_x, current_y);
      ctx.rotate(arrow.angle);

      const gradient = ctx.createLinearGradient(-arrow.size, 0, arrow.size, 0);
      gradient.addColorStop(0, `${arrow.color}00`);
      gradient.addColorStop(0.5, arrow.color);
      gradient.addColorStop(1, `${arrow.color}00`);

      ctx.fillStyle = gradient;

      ctx.beginPath();
      ctx.moveTo(arrow.size * 0.8, 0);
      ctx.lineTo(-arrow.size * 0.4, arrow.size * 0.4);
      ctx.lineTo(-arrow.size * 0.2, 0);
      ctx.lineTo(-arrow.size * 0.4, -arrow.size * 0.4);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = `${arrow.color}CC`;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();
    };

    const draw_burst_center = (burst: Share_Burst) => {
      const pulse = Math.sin(frame_count * 0.05) * 0.3 + 0.7;
      const radius = 8 * pulse;

      const gradient = ctx.createRadialGradient(burst.x, burst.y, 0, burst.x, burst.y, radius * 2);
      gradient.addColorStop(0, burst.color);
      gradient.addColorStop(0.5, `${burst.color}AA`);
      gradient.addColorStop(1, `${burst.color}00`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(burst.x, burst.y, radius * 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = burst.color;
      ctx.beginPath();
      ctx.arc(burst.x, burst.y, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#FFFFFF80";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(burst.x, burst.y, radius, 0, Math.PI * 2);
      ctx.stroke();
    };

    const update_burst = (burst: Share_Burst) => {
      if (frame_count >= burst.next_ring_time) {
        burst.rings.push({
          radius: 0,
          opacity: 1,
          max_radius: 100 + Math.random() * 100,
          speed: 1.5 + Math.random() * 1,
        });
        burst.next_ring_time = frame_count + 30 + Math.random() * 30;

        if (Math.random() > 0.7) {
          for (let i = 0; i < 3; i++) {
            share_arrows.push(create_share_arrow(burst));
          }
        }
      }

      for (let i = burst.rings.length - 1; i >= 0; i--) {
        const ring = burst.rings[i];
        ring.radius += ring.speed;
        ring.opacity = 1 - ring.radius / ring.max_radius;

        if (ring.radius >= ring.max_radius) {
          burst.rings.splice(i, 1);
        }
      }
    };

    const update_arrow = (arrow: Share_Arrow) => {
      arrow.distance += arrow.speed;

      const progress = arrow.distance / arrow.max_distance;
      if (progress < 0.2) {
        arrow.opacity = progress / 0.2;
      } else if (progress > 0.8) {
        arrow.opacity = (1 - progress) / 0.2;
      } else {
        arrow.opacity = 1;
      }

      return arrow.distance < arrow.max_distance;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame_count++;

      share_bursts.forEach((burst) => {
        update_burst(burst);

        burst.rings.forEach((ring) => {
          draw_share_ring(ring, burst.x, burst.y, burst.color);
        });

        draw_burst_center(burst);
      });

      for (let i = share_arrows.length - 1; i >= 0; i--) {
        const arrow = share_arrows[i];
        if (!update_arrow(arrow)) {
          share_arrows.splice(i, 1);
        } else {
          draw_share_arrow(arrow);
        }
      }

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
      className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-950 via-indigo-950 to-blue-950"
    />
  );
}
