"use client";

import React, { useEffect, useRef } from "react";

type Message_Path = {
  points: { x: number; y: number }[];
  progress: number;
  speed: number;
  color: string;
  width: number;
  glow_intensity: number;
  start_side: "left" | "right";
  lifetime: number;
  max_lifetime: number;
};

type Message_Dot = {
  x: number;
  y: number;
  size: number;
  color: string;
  pulse_phase: number;
  side: "left" | "right";
};

export function Background_Direct_Messages() {
  const canvas_ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvas_ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize_canvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initialize_dots();
    };

    const message_paths: Message_Path[] = [];
    const message_dots: Message_Dot[] = [];
    let animation_frame: number;
    let frame_count = 0;

    const colors = [
      "#FF6B9D",
      "#4ECDC4",
      "#45B7D1",
      "#A29BFE",
      "#74B9FF",
      "#55E6C1",
      "#FD79A8",
      "#F8B500",
    ];

    const initialize_dots = () => {
      message_dots.length = 0;
      const padding = 80;
      const dot_count = 6;

      for (let i = 0; i < dot_count; i++) {
        const y = padding + (i / (dot_count - 1)) * (canvas.height - padding * 2);

        message_dots.push({
          x: padding,
          y: y + (Math.random() - 0.5) * 40,
          size: 8 + Math.random() * 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          pulse_phase: Math.random() * Math.PI * 2,
          side: "left",
        });

        message_dots.push({
          x: canvas.width - padding,
          y: y + (Math.random() - 0.5) * 40,
          size: 8 + Math.random() * 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          pulse_phase: Math.random() * Math.PI * 2,
          side: "right",
        });
      }
    };

    resize_canvas();

    const create_message_path = (): Message_Path => {
      const start_side = Math.random() > 0.5 ? "left" : "right";
      const padding = 80;

      const left_dots = message_dots.filter((d) => d.side === "left");
      const right_dots = message_dots.filter((d) => d.side === "right");

      const start_dot = start_side === "left"
        ? left_dots[Math.floor(Math.random() * left_dots.length)]
        : right_dots[Math.floor(Math.random() * right_dots.length)];

      const end_dot = start_side === "left"
        ? right_dots[Math.floor(Math.random() * right_dots.length)]
        : left_dots[Math.floor(Math.random() * left_dots.length)];

      const points: { x: number; y: number }[] = [];
      const num_control_points = 3 + Math.floor(Math.random() * 3);

      points.push({ x: start_dot.x, y: start_dot.y });

      for (let i = 1; i < num_control_points; i++) {
        const t = i / num_control_points;
        const x = start_dot.x + (end_dot.x - start_dot.x) * t;
        const y = start_dot.y + (end_dot.y - start_dot.y) * t;
        const curve_offset = (Math.random() - 0.5) * 100;

        points.push({ x, y: y + curve_offset });
      }

      points.push({ x: end_dot.x, y: end_dot.y });

      return {
        points,
        progress: 0,
        speed: 0.003 + Math.random() * 0.004,
        color: start_dot.color,
        width: 2 + Math.random() * 2,
        glow_intensity: 0.4 + Math.random() * 0.4,
        start_side,
        lifetime: 0,
        max_lifetime: 180 + Math.random() * 120,
      };
    };

    const get_point_on_curve = (points: { x: number; y: number }[], t: number): { x: number; y: number } => {
      if (points.length === 2) {
        const x = points[0].x + (points[1].x - points[0].x) * t;
        const y = points[0].y + (points[1].y - points[0].y) * t;
        return { x, y };
      }

      const segment_count = points.length - 1;
      const segment_index = Math.min(Math.floor(t * segment_count), segment_count - 1);
      const segment_t = (t * segment_count) - segment_index;

      const p0 = points[segment_index];
      const p1 = points[segment_index + 1];

      const x = p0.x + (p1.x - p0.x) * segment_t;
      const y = p0.y + (p1.y - p0.y) * segment_t;

      return { x, y };
    };

    const draw_message_dot = (dot: Message_Dot) => {
      const pulse = Math.sin(frame_count * 0.03 + dot.pulse_phase) * 0.3 + 0.7;
      const current_size = dot.size * pulse;

      const gradient = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, current_size * 2);
      gradient.addColorStop(0, dot.color);
      gradient.addColorStop(0.5, `${dot.color}AA`);
      gradient.addColorStop(1, `${dot.color}00`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, current_size * 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = dot.color;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, current_size, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, current_size, 0, Math.PI * 2);
      ctx.stroke();
    };

    const draw_message_path = (path: Message_Path) => {
      if (path.progress <= 0) return;

      ctx.save();

      const draw_length = Math.min(path.progress, 1);
      const num_segments = 100;

      ctx.strokeStyle = path.color;
      ctx.lineWidth = path.width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowColor = path.color;
      ctx.shadowBlur = 10 * path.glow_intensity;

      ctx.beginPath();
      const start = get_point_on_curve(path.points, 0);
      ctx.moveTo(start.x, start.y);

      for (let i = 1; i <= num_segments * draw_length; i++) {
        const t = i / num_segments;
        const point = get_point_on_curve(path.points, t);
        ctx.lineTo(point.x, point.y);
      }

      ctx.stroke();

      if (draw_length < 1) {
        const head_point = get_point_on_curve(path.points, draw_length);

        const gradient = ctx.createRadialGradient(
          head_point.x,
          head_point.y,
          0,
          head_point.x,
          head_point.y,
          8
        );
        gradient.addColorStop(0, path.color);
        gradient.addColorStop(1, `${path.color}00`);

        ctx.shadowBlur = 15 * path.glow_intensity;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(head_point.x, head_point.y, 8, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const update_message_path = (path: Message_Path) => {
      path.progress += path.speed;
      path.lifetime += 1;

      if (path.progress > 1.3 || path.lifetime > path.max_lifetime) {
        return false;
      }

      return true;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame_count++;

      if (frame_count % 40 === 0 && message_paths.length < 8) {
        message_paths.push(create_message_path());
      }

      message_dots.forEach(draw_message_dot);

      for (let i = message_paths.length - 1; i >= 0; i--) {
        const path = message_paths[i];
        if (!update_message_path(path)) {
          message_paths.splice(i, 1);
        } else {
          draw_message_path(path);
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
      className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950"
    />
  );
}
