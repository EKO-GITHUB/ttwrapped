"use client";

import React, { useEffect, useRef } from "react";

type Speech_Bubble = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  opacity: number;
  color: string;
  has_dots: boolean;
  dot_animation_phase: number;
  tail_direction: "left" | "right";
  lifetime: number;
  max_lifetime: number;
  pulse_phase: number;
};

export function Background_Comments() {
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

    const speech_bubbles: Speech_Bubble[] = [];
    let animation_frame: number;
    let frame_count = 0;

    const colors = [
      "#FF6B9D",
      "#C44569",
      "#4ECDC4",
      "#45B7D1",
      "#FFA07A",
      "#98D8C8",
      "#B8E994",
      "#A29BFE",
      "#FD79A8",
      "#74B9FF",
    ];

    const create_speech_bubble = (): Speech_Bubble => {
      const spawn_from_bottom = Math.random() > 0.5;

      return {
        x: Math.random() * canvas.width,
        y: spawn_from_bottom ? canvas.height + 50 : -50,
        vx: (Math.random() - 0.5) * 0.5,
        vy: spawn_from_bottom ? -(Math.random() * 1.5 + 0.1) : Math.random() * 1.5 + 0.1,
        width: 60 + Math.random() * 80,
        height: 40 + Math.random() * 40,
        opacity: 0.6 + Math.random() * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        has_dots: Math.random() > 0.4,
        dot_animation_phase: Math.random() * Math.PI * 2,
        tail_direction: Math.random() > 0.5 ? "left" : "right",
        lifetime: 0,
        max_lifetime: 300 + Math.random() * 200,
        pulse_phase: Math.random() * Math.PI * 2,
      };
    };

    for (let i = 0; i < 12; i++) {
      speech_bubbles.push(create_speech_bubble());
    }

    const draw_speech_bubble = (bubble: Speech_Bubble) => {
      ctx.save();

      const lifetime_progress = bubble.lifetime / bubble.max_lifetime;
      let current_opacity = bubble.opacity;

      if (lifetime_progress < 0.1) {
        current_opacity *= lifetime_progress / 0.1;
      } else if (lifetime_progress > 0.9) {
        current_opacity *= (1 - lifetime_progress) / 0.1;
      }

      const pulse = Math.sin(frame_count * 0.03 + bubble.pulse_phase) * 0.05 + 0.95;
      const current_width = bubble.width * pulse;
      const current_height = bubble.height * pulse;

      ctx.globalAlpha = current_opacity;

      const radius = 15;
      const x = bubble.x - current_width / 2;
      const y = bubble.y - current_height / 2;

      ctx.fillStyle = bubble.color;
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + current_width - radius, y);
      ctx.quadraticCurveTo(x + current_width, y, x + current_width, y + radius);
      ctx.lineTo(x + current_width, y + current_height - radius);
      ctx.quadraticCurveTo(x + current_width, y + current_height, x + current_width - radius, y + current_height);
      ctx.lineTo(x + radius, y + current_height);
      ctx.quadraticCurveTo(x, y + current_height, x, y + current_height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fill();

      const tail_size = 12;
      const tail_x = bubble.tail_direction === "left" ? x + 20 : x + current_width - 20;
      const tail_y = y + current_height;

      ctx.beginPath();
      ctx.moveTo(tail_x, tail_y);
      ctx.lineTo(tail_x + (bubble.tail_direction === "left" ? -tail_size : tail_size), tail_y + tail_size);
      ctx.lineTo(tail_x + (bubble.tail_direction === "left" ? tail_size : -tail_size), tail_y);
      ctx.closePath();
      ctx.fill();

      if (bubble.has_dots) {
        const dot_count = 3;
        const dot_spacing = current_width / (dot_count + 1);
        const dot_radius = 3;

        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";

        for (let i = 0; i < dot_count; i++) {
          const phase_offset = i * 0.4;
          const dot_scale = Math.sin(frame_count * 0.1 + bubble.dot_animation_phase + phase_offset) * 0.3 + 0.7;
          const dot_x = bubble.x - current_width / 2 + dot_spacing * (i + 1);
          const dot_y = bubble.y;

          ctx.beginPath();
          ctx.arc(dot_x, dot_y, dot_radius * dot_scale, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        const line_count = 2 + Math.floor(Math.random() * 2);
        const line_spacing = current_height / (line_count + 1);

        ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";

        for (let i = 0; i < line_count; i++) {
          const line_y = bubble.y - current_height / 2 + line_spacing * (i + 1);
          const line_width = current_width * 0.6;

          ctx.beginPath();
          ctx.moveTo(bubble.x - line_width / 2, line_y);
          ctx.lineTo(bubble.x + line_width / 2, line_y);
          ctx.stroke();
        }
      }

      ctx.restore();
    };

    const update_bubble = (bubble: Speech_Bubble) => {
      bubble.x += bubble.vx;
      bubble.y += bubble.vy;
      bubble.lifetime += 1;

      if (bubble.x < -bubble.width) bubble.x = canvas.width + bubble.width;
      if (bubble.x > canvas.width + bubble.width) bubble.x = -bubble.width;

      if (bubble.lifetime >= bubble.max_lifetime || bubble.y < -bubble.height - 50 || bubble.y > canvas.height + 50) {
        const new_bubble = create_speech_bubble();
        Object.assign(bubble, new_bubble);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame_count++;

      speech_bubbles.forEach((bubble) => {
        update_bubble(bubble);
        draw_speech_bubble(bubble);
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
      className="fixed inset-0 -z-10 bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900"
    />
  );
}
