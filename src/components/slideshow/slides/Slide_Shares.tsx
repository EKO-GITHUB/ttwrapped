"use client";

import { Animated_Number } from "@/components/slideshow/Animated_Number";
import { format_number } from "@/components/slideshow/format_number";
import { useData_store } from "@/stores/useData_store";
import { motion } from "framer-motion";

export function Slide_Shares() {
  const stats = useData_store((state) => state.stats);
  const is_exporting = useData_store((state) => state.is_exporting);
  if (!stats) return null;

  const share_count = stats.share_count;

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
        Videos Shared
      </motion.p>
      <motion.p
        className="mb-4 text-7xl font-bold"
        {...(!is_exporting && {
          initial: { opacity: 0, scale: 0.5 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.6, delay: 0.4, type: "spring", bounce: 0.3 },
        })}
      >
        <motion.span
          {...(!is_exporting && {
            animate: { scale: [1, 1.05, 1] },
            transition: { duration: 2, repeat: Infinity, repeatDelay: 1 },
          })}
        >
          <Animated_Number
            value={share_count}
            duration={1.8}
            format={format_number}
          />
        </motion.span>
      </motion.p>
      <motion.p
        className="text-xl opacity-80"
        {...(!is_exporting && {
          initial: { opacity: 0 },
          animate: { opacity: 0.8 },
          transition: { duration: 0.5, delay: 1.5 },
        })}
      >
        {share_count > 50 ? "Sharing is caring!" : "Keeping the good stuff to yourself"}
      </motion.p>
    </>
  );
}
