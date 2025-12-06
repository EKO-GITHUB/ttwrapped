"use client";

import { motion } from "framer-motion";
import { format_number } from "@/components/slideshow/format_number";
import { Animated_Number } from "@/components/slideshow/Animated_Number";
import { useData_store } from "@/stores/useData_store";

export function Slide_Likes() {
  const stats = useData_store((state) => state.stats);
  if (!stats) return null;

  const like_count = stats.like_count;
  const favorite_count = stats.favorite_count;

  return (
    <>
      <motion.p
        className="mb-4 text-lg font-medium opacity-80"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Videos Liked
      </motion.p>
      <motion.p
        className="mb-2 text-7xl font-bold"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4, type: "spring", bounce: 0.3 }}
      >
        <motion.span
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1.5 }}
        >
          <Animated_Number value={like_count} duration={1.8} format={format_number} />
        </motion.span>
      </motion.p>
      <motion.p
        className="mb-6 text-xl opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        Spreading the love
      </motion.p>

      <motion.p
        className="mb-2 text-sm font-medium tracking-wide uppercase opacity-60"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 0.5, delay: 2.0 }}
      >
        Favorites Saved
      </motion.p>
      <motion.p
        className="text-4xl font-bold"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 2.2, type: "spring", bounce: 0.3 }}
      >
        <Animated_Number value={favorite_count} duration={1.2} format={format_number} />
      </motion.p>
      <motion.p
        className="mt-1 text-base opacity-70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.5, delay: 2.8 }}
      >
        Your personal collection
      </motion.p>
    </>
  );
}
