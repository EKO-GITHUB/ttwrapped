"use client";

import { Animated_Number } from "@/components/slideshow/Animated_Number";
import { format_number } from "@/components/slideshow/format_number";
import { useData_store } from "@/stores/useData_store";
import { motion } from "framer-motion";
import { Bookmark, HeartIcon } from "lucide-react";
import { useExport } from "@/contexts/ExportContext";

export function Slide_Likes() {
  const stats = useData_store((state) => state.stats);
  const { is_exporting } = useExport();
  if (!stats) return null;

  const like_count = stats.like_count;
  const favorite_count = stats.favorite_count;

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
        Videos Liked
      </motion.p>
      <motion.div
        className="mb-2 text-7xl font-bold"
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
          <div className={"flex items-center justify-center gap-1"}>
            <Animated_Number value={like_count} duration={1.8} format={format_number} />
            <HeartIcon size={40} color={"red"} fill={"red"} />
          </div>
        </motion.span>
      </motion.div>
      <motion.p
        className="mb-6 text-xl opacity-80"
        {...(!is_exporting && {
          initial: { opacity: 0 },
          animate: { opacity: 0.8 },
          transition: { duration: 0.5, delay: 1.5 },
        })}
      >
        Spreading the love
      </motion.p>

      <motion.p
        className="mb-2 text-sm font-medium tracking-wide uppercase opacity-60"
        {...(!is_exporting && {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 0.6, y: 0 },
          transition: { duration: 0.5, delay: 2.0 },
        })}
      >
        Favorites Saved
      </motion.p>
      <motion.div
        className="text-4xl font-bold"
        {...(!is_exporting && {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.5, delay: 2.2, type: "spring", bounce: 0.3 },
        })}
      >
        <div className={"flex items-center justify-center gap-1"}>
          <Animated_Number value={favorite_count} duration={1.2} format={format_number} />
          <Bookmark size={30} color={"gold"} fill={"gold"} />
        </div>
      </motion.div>
      <motion.p
        className="mt-1 text-base opacity-70"
        {...(!is_exporting && {
          initial: { opacity: 0 },
          animate: { opacity: 0.7 },
          transition: { duration: 0.5, delay: 2.8 },
        })}
      >
        Your personal collection
      </motion.p>
    </>
  );
}
