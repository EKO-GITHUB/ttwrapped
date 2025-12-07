"use client";

import { useEffect, useRef } from "react";

export function useCanvasAnimation(draw: (ctx: CanvasRenderingContext2D, frameCount: number, time: number) => void) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      frameCountRef.current++;
      timeRef.current += 0.016; // ~60fps

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      draw(ctx, frameCountRef.current, timeRef.current);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [draw]);

  return { canvasRef, frameCountRef, timeRef };
}
