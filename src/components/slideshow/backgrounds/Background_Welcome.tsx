import { Background_Panel } from "@/components/slideshow/backgrounds/Background_Panel";
import { useData_store } from "@/stores/useData_store";
import { motion } from "framer-motion";
import React from "react";

export function Background_Welcome() {
  const is_exporting = useData_store((state) => state.is_exporting);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-white bg-[radial-gradient(#000000_1.5px,transparent_1.5px)] [background-size:20px_20px]"
        {...(!is_exporting && {
          animate: {
            backgroundPosition: ["-40px -40px", "0px 0px"],
          },
          transition: {
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          },
        })}
      />
      <Background_Panel className={"bg-slate-800"} />
    </div>
  );
}
