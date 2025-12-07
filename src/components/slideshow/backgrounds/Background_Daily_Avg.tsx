"use client";

import React, { useEffect, useRef } from "react";

type Wave_Bar = {
  y_offset: number;
  height: number;
  frequency: number;
  amplitude: number;
  speed: number;
  phase: number;
  color: string;
  opacity: number;
};

export function Background_Daily_Avg() {
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

    const wave_bars: Wave_Bar[] = [];
    let animation_frame: number;
    let time = 0;

    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E2"];

    const create_wave_bars = () => {
      const bar_count = 7;
      const spacing = canvas.height / (bar_count + 1);

      for (let i = 0; i < bar_count; i++) {
        wave_bars.push({
          y_offset: spacing * (i + 1),
          height: 40 + Math.random() * 30,
          frequency: 0.003 + Math.random() * 0.004,
          amplitude: 30 + Math.random() * 40,
          speed: 0.3 + Math.random() * 0.4,
          phase: Math.random() * Math.PI * 2,
          color: colors[i % colors.length],
          opacity: 0.15 + Math.random() * 0.15,
        });
      }
    };

    create_wave_bars();

    const draw_wave_bar = (bar: Wave_Bar) => {
      ctx.save();

      ctx.globalAlpha = bar.opacity;

      const points: { x: number; y: number }[] = [];
      const step = 5;

      for (let x = -50; x <= canvas.width + 50; x += step) {
        const wave_y = Math.sin(x * bar.frequency + time * bar.speed + bar.phase) * bar.amplitude;
        points.push({ x, y: bar.y_offset + wave_y });
      }

      const gradient = ctx.createLinearGradient(0, bar.y_offset - bar.height, 0, bar.y_offset + bar.height);
      gradient.addColorStop(0, `${bar.color}00`);
      gradient.addColorStop(0.5, bar.color);
      gradient.addColorStop(1, `${bar.color}00`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y - bar.height / 2);

      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y - bar.height / 2);
      }

      for (let i = points.length - 1; i >= 0; i--) {
        ctx.lineTo(points[i].x, points[i].y + bar.height / 2);
      }

      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = `${bar.color}80`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();

      ctx.restore();
    };

    const draw_day_markers = () => {
      const marker_count = 7;
      const spacing = canvas.width / (marker_count + 1);

      for (let i = 1; i <= marker_count; i++) {
        const x = spacing * i;
        const pulse = Math.sin(time * 0.5 + i * 0.8) * 0.3 + 0.7;

        ctx.save();
        ctx.globalAlpha = 0.1 * pulse;
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 2;
        ctx.setLineDash([10, 10]);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "12px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`Day ${i}`, x, canvas.height - 20);
        ctx.restore();
      }
    };

    const draw_average_line = () => {
      const y = canvas.height / 2;
      const points: { x: number; y: number }[] = [];
      const step = 8;

      for (let x = 0; x <= canvas.width; x += step) {
        const noise = Math.sin(x * 0.01 + time * 0.3) * 10;
        points.push({ x, y: y + noise });
      }

      ctx.save();
      ctx.strokeStyle = "rgba(143,143,143,0.4)";
      ctx.lineWidth = 3;
      ctx.setLineDash([15, 10]);
      ctx.shadowColor = "rgba(163,163,163,0.5)";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("Average", 30, y - 15);
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      time += 0.016;

      draw_day_markers();
      wave_bars.forEach(draw_wave_bar);
      draw_average_line();

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
      className="fixed inset-0 -z-10 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
    />
  );
}
