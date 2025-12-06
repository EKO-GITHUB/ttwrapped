"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

export function Animated_Number({
  value,
  className,
  duration = 1.5,
  format,
}: {
  value: number;
  className?: string;
  duration?: number;
  format?: (value: number) => string;
}) {
  const motion_value = useMotionValue(0);
  const rounded = useTransform(motion_value, (latest) => {
    return format ? format(Math.round(latest)) : Math.round(latest).toLocaleString();
  });

  useEffect(() => {
    const controls = animate(motion_value, value, {
      duration,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [motion_value, value, duration]);

  return <motion.span className={className}>{rounded}</motion.span>;
}
