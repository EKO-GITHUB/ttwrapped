"use client";

import { Animated_Number } from "@/components/slideshow/Animated_Number";
import { format_number } from "@/components/slideshow/format_number";
import { get_skill_you_could_have_learned } from "@/components/slideshow/slides/slide_watch_time/skill_you_could_have_learned";
import { useData_store } from "@/stores/useData_store";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export function Slide_Watch_Time() {
  const stats = useData_store((state) => state.stats);
  const is_exporting = useData_store((state) => state.is_exporting);
  if (!stats) return null;

  const hours = stats.watch.total_watch_time_hours;

  const minutes = Math.round(hours * 60);
  const days = hours / 24;
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
        Estimated Watch Time
      </motion.p>
      <motion.div
        className="mb-2 text-4xl font-bold"
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
            <Animated_Number
              value={minutes}
              duration={1.8}
              format={format_number}
            />
            <span>min</span>
            <Clock
              size={20}
              color={"cyan"}
              strokeWidth={2.5}
            />
          </div>
        </motion.span>
      </motion.div>
      <motion.p
        className="mb-6 text-lg opacity-70"
        {...(!is_exporting && {
          initial: { opacity: 0 },
          animate: { opacity: 0.7 },
          transition: { duration: 0.5, delay: 1.5 },
        })}
      >
        {days >= 7
          ? `That's ~${Math.round(days)} days of your life!`
          : days >= 1
            ? `~${Math.round(days)} full days of content`
            : "Time flies when you're scrolling"}
      </motion.p>
      <motion.p
        className={"max-w-lg text-sm opacity-70"}
        {...(!is_exporting && {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 0.7, y: 0 },
          transition: { duration: 0.5, delay: 2.0 },
        })}
      >
        {get_skill_you_could_have_learned(minutes)}
      </motion.p>
    </>
  );
}
