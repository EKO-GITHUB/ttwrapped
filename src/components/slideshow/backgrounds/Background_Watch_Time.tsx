"use client";

import { useEffect, useRef } from "react";

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
};

export function Background_Watch_Time() {
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

    const orbs: Time_Orb[] = [];
    const clock_hands: Clock_Hand[] = [];
    let animation_frame: number;
    let frame_count = 0;

    const create_orb = (): Time_Orb => {
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -(Math.random() * 0.8 + 0.3),
        size: Math.random() * 40 + 20,
        opacity: Math.random() * 0.4 + 0.2,
        hue: Math.random() * 60 + 170,
        phase: Math.random() * Math.PI * 2,
        pulse_speed: Math.random() * 0.02 + 0.01,
      };
    };

    const create_clock_hand = (): Clock_Hand => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        angle: Math.random() * Math.PI * 2,
        rotation_speed: (Math.random() - 0.5) * 0.01,
        size: Math.random() * 30 + 20,
        opacity: Math.random() * 0.15 + 0.05,
      };
    };

    for (let i = 0; i < 15; i++) {
      orbs.push(create_orb());
    }

    for (let i = 0; i < 8; i++) {
      clock_hands.push(create_clock_hand());
    }

    const draw_orb = (orb: Time_Orb) => {
      const pulse = Math.sin(frame_count * orb.pulse_speed + orb.phase) * 0.2 + 0.8;
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
      highlight_gradient.addColorStop(0, `rgba(255, 255, 255, ${orb.opacity * 0.5})`);
      highlight_gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.fillStyle = highlight_gradient;
      ctx.beginPath();
      ctx.arc(highlight_x, highlight_y, current_size * 0.5, 0, Math.PI * 2);
      ctx.fill();
    };

    const draw_clock_hand = (hand: Clock_Hand) => {
      ctx.save();
      ctx.globalAlpha = hand.opacity;
      ctx.translate(hand.x, hand.y);
      ctx.rotate(hand.angle);

      ctx.strokeStyle = "rgba(100, 200, 255, 0.6)";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(hand.size, 0);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(100, 200, 255, 0.8)";
      ctx.fill();

      ctx.restore();
    };

    const update_orbs = () => {
      for (let i = orbs.length - 1; i >= 0; i--) {
        const orb = orbs[i];
        orb.x += orb.vx;
        orb.y += orb.vy;

        const distance_from_center_x = Math.abs(orb.x - canvas.width / 2);
        orb.vx += (Math.random() - 0.5) * 0.02;
        orb.vx += (distance_from_center_x / canvas.width - 0.5) * -0.01;

        if (orb.y < -orb.size * 2) {
          orbs[i] = create_orb();
        }

        if (orb.x < -orb.size) orb.x = canvas.width + orb.size;
        if (orb.x > canvas.width + orb.size) orb.x = -orb.size;
      }
    };

    const update_clock_hands = () => {
      clock_hands.forEach((hand) => {
        hand.angle += hand.rotation_speed;
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      frame_count++;

      update_orbs();
      update_clock_hands();

      clock_hands.forEach(draw_clock_hand);
      orbs.forEach(draw_orb);

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
      className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950"
    />
  );
}
