"use client";

import { useData_store } from "@/stores/useData_store";
import { motion } from "framer-motion";

export function Slide_Complete() {
  const is_exporting = useData_store((state) => state.is_exporting);

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
        That&apos;s a wrap!
      </motion.p>
      <motion.p
        className="mb-4 text-7xl font-bold"
        {...(!is_exporting && {
          initial: { opacity: 0, scale: 0.5, rotate: -10 },
          animate: { opacity: 1, scale: 1, rotate: 0 },
          transition: { duration: 0.8, delay: 0.5, type: "spring", bounce: 0.4 },
        })}
      >
        <motion.span
          {...(!is_exporting && {
            animate: { scale: [1, 1.1, 1] },
            transition: { duration: 1.5, repeat: Infinity, repeatDelay: 1 },
          })}
        >
          Done
        </motion.span>
      </motion.p>
      <motion.p
        className="text-xl opacity-80"
        {...(!is_exporting && {
          initial: { opacity: 0 },
          animate: { opacity: 0.8 },
          transition: { duration: 0.5, delay: 1.2 },
        })}
      >
        Ready to explore your full analytics?
      </motion.p>
    </>
  );
}
