"use client";

import { Animated_Number } from "@/components/slideshow/Animated_Number";
import { format_gb } from "@/components/slideshow/format_gb";
import { get_download_equivalent } from "@/components/slideshow/slides/slide_download_size/get_download_equivalent";
import { useData_store } from "@/stores/useData_store";
import { motion } from "framer-motion";
import { HardDrive } from "lucide-react";
import { useExport } from "@/contexts/ExportContext";

export function Slide_Download_Size() {
  const stats = useData_store((state) => state.stats);
  const { is_exporting } = useExport();
  if (!stats) return null;

  const gb = stats.watch.estimated_download_gb;

  return (
    <>
      <motion.p
        className="mb-4 text-lg font-medium opacity-80"
        {...(!is_exporting && {
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 0.8, y: 0 },
          transition: { duration: 0.5, delay: 0.2 },
        })}
      >
        If You Downloaded It All
      </motion.p>
      <motion.div
        className="mb-4 text-4xl font-bold"
        {...(!is_exporting && {
          initial: { opacity: 0, scale: 0.5 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.6, delay: 0.4, type: "spring", bounce: 0.3 },
        })}
      >
        <motion.span
          {...(!is_exporting && {
            animate: { scale: [1, 1.08, 1] },
            transition: { duration: 1.5, repeat: Infinity, repeatDelay: 1.5 },
          })}
        >
          <div className={"flex items-center justify-center gap-2"}>
            <Animated_Number value={gb} duration={1.8} format={format_gb} />
            <HardDrive size={40} color={"#00FF00"} strokeWidth={2} />
          </div>
        </motion.span>
      </motion.div>
      <motion.p
        className={"max-w-lg text-sm opacity-70"}
        {...(!is_exporting && {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 0.7, y: 0 },
          transition: { duration: 0.5, delay: 1.5 },
        })}
      >
        {get_download_equivalent(gb)}
      </motion.p>
    </>
  );
}
