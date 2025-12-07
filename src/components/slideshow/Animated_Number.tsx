"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useExport } from "@/contexts/ExportContext";

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
  const { is_exporting } = useExport();
  const motion_value = useMotionValue(is_exporting ? value : 0);
  const rounded = useTransform(motion_value, (latest) => {
    return format ? format(Math.round(latest)) : Math.round(latest).toLocaleString();
  });

  useEffect(() => {
    if (is_exporting) return;

    const controls = animate(motion_value, value, {
      duration,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [motion_value, value, duration, is_exporting]);

  return <motion.span className={className}>{rounded}</motion.span>;
}
