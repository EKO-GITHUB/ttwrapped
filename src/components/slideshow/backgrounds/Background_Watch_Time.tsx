"use client";

import React, { useEffect, useRef } from "react";

type Time_Orb = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
  phase: number;
  pulse_speed: number;
};

type Clock_Hand = {
  x: number;
  y: number;
  angle: number;
  rotation_speed: number;
  size: number;
  opacity: number;
  has_face: boolean;
};

export function Background_Watch_Time() {
  const canvas_ref = useRef<HTMLCanvasElement>(null);
  const animation_frame_ref = useRef<number>(0);
  const frame_count_ref = useRef<number>(0);

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

    const orbs: Time_Orb[] = [];
    const clock_hands: Clock_Hand[] = [];

    const create_orb = (): Time_Orb => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -(Math.random() * 0.8 + 0.3),
      size: Math.random() * 40 + 20,
      opacity: Math.random() * 0.4 + 0.2,
      hue: Math.random() * 60 + 170,
      phase: Math.random() * Math.PI * 2,
      pulse_speed: Math.random() * 0.02 + 0.01,
    });

    const create_clock_hand = (): Clock_Hand => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      angle: Math.random() * Math.PI * 2,
      rotation_speed: (Math.random() - 0.5) * 0.015,
      size: Math.random() * 50 + 40,
      opacity: Math.random() * 0.25 + 0.15,
      has_face: Math.random() > 0.5,
    });

    for (let i = 0; i < 15; i++) orbs.push(create_orb());
    for (let i = 0; i < 12; i++) clock_hands.push(create_clock_hand());

    const animate = () => {
      frame_count_ref.current++;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = orbs.length - 1; i >= 0; i--) {
        const orb = orbs[i];
        orb.x += orb.vx;
        orb.y += orb.vy;

        const distance_from_center_x = Math.abs(orb.x - canvas.width / 2);
        orb.vx += (Math.random() - 0.5) * 0.02;
        orb.vx += (distance_from_center_x / canvas.width - 0.5) * -0.01;

        if (orb.y < -orb.size * 2) orbs[i] = create_orb();
        if (orb.x < -orb.size) orb.x = canvas.width + orb.size;
        if (orb.x > canvas.width + orb.size) orb.x = -orb.size;
      }

      clock_hands.forEach((hand) => {
        hand.angle += hand.rotation_speed;
      });

      clock_hands.forEach((hand) => {
        ctx.save();
        ctx.globalAlpha = hand.opacity;
        ctx.translate(hand.x, hand.y);

        if (hand.has_face) {
          ctx.strokeStyle = "rgba(100, 200, 255, 0.3)";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(0, 0, hand.size * 1.2, 0, Math.PI * 2);
          ctx.stroke();

          for (let i = 0; i < 12; i++) {
            const tick_angle = (i * Math.PI) / 6;
            const tick_start = hand.size * 1.05;
            const tick_end = hand.size * 1.15;
            ctx.beginPath();
            ctx.moveTo(Math.cos(tick_angle) * tick_start, Math.sin(tick_angle) * tick_start);
            ctx.lineTo(Math.cos(tick_angle) * tick_end, Math.sin(tick_angle) * tick_end);
            ctx.strokeStyle = "rgba(100, 200, 255, 0.4)";
            ctx.lineWidth = i % 3 === 0 ? 3 : 1.5;
            ctx.stroke();
          }
        }

        ctx.rotate(hand.angle);
        const gradient = ctx.createLinearGradient(0, 0, hand.size * 0.7, 0);
        gradient.addColorStop(0, "rgba(100, 200, 255, 0.9)");
        gradient.addColorStop(1, "rgba(100, 200, 255, 0.3)");
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(-hand.size * 0.15, 0);
        ctx.lineTo(hand.size * 0.7, 0);
        ctx.stroke();

        ctx.rotate(hand.angle * 0.1 + Math.PI / 2);
        ctx.strokeStyle = "rgba(255, 150, 100, 0.7)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-hand.size * 0.1, 0);
        ctx.lineTo(hand.size * 0.5, 0);
        ctx.stroke();
        ctx.rotate(-hand.angle * 0.1 - Math.PI / 2);
        ctx.rotate(-hand.angle);

        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(100, 200, 255, 0.9)";
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      });

      orbs.forEach((orb) => {
        const pulse = Math.sin(frame_count_ref.current * orb.pulse_speed + orb.phase) * 0.2 + 0.8;
        const current_size = orb.size * pulse;

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, current_size);
        gradient.addColorStop(0, `hsla(${orb.hue}, 70%, 60%, ${orb.opacity * 0.6})`);
        gradient.addColorStop(0.5, `hsla(${orb.hue}, 60%, 50%, ${orb.opacity * 0.3})`);
        gradient.addColorStop(1, `hsla(${orb.hue}, 50%, 40%, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, current_size, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `hsla(${orb.hue}, 80%, 70%, ${orb.opacity * 0.4})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, current_size * 0.9, 0, Math.PI * 2);
        ctx.stroke();

        const highlight_x = orb.x - current_size * 0.3;
        const highlight_y = orb.y - current_size * 0.3;
        const highlight_gradient = ctx.createRadialGradient(
          highlight_x,
          highlight_y,
          0,
          highlight_x,
          highlight_y,
          current_size * 0.5,
        );
        highlight_gradient.addColorStop(0, `rgba(255,255,255,${orb.opacity * 0.5})`);
        highlight_gradient.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = highlight_gradient;
        ctx.beginPath();
        ctx.arc(highlight_x, highlight_y, current_size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animation_frame_ref.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize_canvas);
      if (animation_frame_ref.current) cancelAnimationFrame(animation_frame_ref.current);
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <canvas
        ref={canvas_ref}
        className="absolute inset-0 h-full w-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950"
      />
    </div>
  );
}
