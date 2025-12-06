"use client";

import { motion } from "framer-motion";
import { format_number } from "@/components/slideshow/format_number";
import { Animated_Number } from "@/components/slideshow/Animated_Number";
import { useData_store } from "@/stores/useData_store";

export function Slide_Daily_Average() {
  const stats = useData_store((state) => state.stats);
  if (!stats) return null;

  const videos_per_day = stats.watch.videos_per_day_avg;
  const total_videos = stats.watch.total_videos;

  const INDUSTRY_COMPLETION_RATE = 0.65;
  const estimated_completed = Math.round(total_videos * INDUSTRY_COMPLETION_RATE);

  return (
    <>
      <motion.p
        className="mb-4 text-lg font-medium opacity-80"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Daily Average
      </motion.p>
      <motion.p
        className="mb-2 text-7xl font-bold"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4, type: "spring", bounce: 0.3 }}
      >
        <motion.span
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        >
          <Animated_Number value={Math.round(videos_per_day)} duration={1.8} />
        </motion.span>
      </motion.p>
      <motion.p
        className="text-xl opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        videos shown per active day
      </motion.p>
      <motion.p
        className="mb-6 text-lg opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.5, delay: 1.8 }}
      >
        {videos_per_day >= 100 ? "The algorithm kept you busy!" : "That's a lot of scrolling"}
      </motion.p>

      <motion.p
        className="mb-2 text-sm font-medium tracking-wide uppercase opacity-60"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 0.5, delay: 2.2 }}
      >
        Estimated Completions
      </motion.p>
      <motion.p
        className="text-4xl font-bold"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 2.4, type: "spring", bounce: 0.3 }}
      >
        ~<Animated_Number value={estimated_completed} duration={1.2} format={format_number} />
      </motion.p>
      <motion.p
        className="mt-1 text-base opacity-70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.5, delay: 2.8 }}
      >
        videos watched to the end
      </motion.p>
      <motion.p
        className="mt-1 text-sm opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 0.5, delay: 3.0 }}
      >
        Based on 65% industry completion rate
      </motion.p>
    </>
  );
}
