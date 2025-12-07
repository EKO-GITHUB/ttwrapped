"use client";

import { Animated_Number } from "@/components/slideshow/Animated_Number";
import { format_number } from "@/components/slideshow/format_number";
import { useData_store } from "@/stores/useData_store";
import { motion } from "framer-motion";

export function Slide_Sessions() {
  const stats = useData_store((state) => state.stats);
  if (!stats) return null;

  const count = stats.watch.session_count;
  const avg_minutes = stats.watch.avg_session_minutes;
  const avg_videos = stats.watch.avg_session_videos;
  const longest_videos = stats.watch.longest_session_videos;
  const longest_minutes = stats.watch.longest_session_minutes;
  const longest_date = stats.watch.longest_session_date;

  const longest_hours = longest_minutes / 60;
  const formatted_date = longest_date?.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className={"rounded-xl bg-zinc-900/80 px-6 py-8"}>
      <motion.p
        className="mb-4 text-lg font-medium opacity-80"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Watch Sessions
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
          <Animated_Number
            value={count}
            duration={1.8}
            format={format_number}
          />
        </motion.span>
      </motion.p>
      <motion.p
        className="text-xl opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        ~
        <Animated_Number
          value={Math.round(avg_videos)}
          duration={1.2}
        />{" "}
        videos per session
      </motion.p>
      <motion.p
        className="mb-6 text-lg opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.5, delay: 1.8 }}
      >
        ~
        <Animated_Number
          value={Math.round(avg_minutes)}
          duration={1.2}
        />{" "}
        min average
      </motion.p>

      <motion.p
        className="mb-2 text-sm font-medium tracking-wide uppercase opacity-60"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 0.5, delay: 2.2 }}
      >
        Longest Session
      </motion.p>
      <motion.p
        className="text-4xl font-bold"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 2.4, type: "spring", bounce: 0.3 }}
      >
        <Animated_Number
          value={longest_videos}
          duration={1.2}
        />
        videos
      </motion.p>
      <motion.p
        className="mt-1 text-base opacity-70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.5, delay: 2.8 }}
      >
        {longest_hours >= 1
          ? `~${longest_hours.toFixed(1)} hours of scrolling`
          : `~${Math.round(longest_minutes)} min of scrolling`}
      </motion.p>
      {formatted_date && (
        <motion.p
          className="mt-1 text-sm opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.5, delay: 3.0 }}
        >
          on {formatted_date}
        </motion.p>
      )}
    </div>
  );
}
