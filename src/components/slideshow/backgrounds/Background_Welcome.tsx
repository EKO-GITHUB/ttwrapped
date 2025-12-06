import { Background_Panel } from "@/components/slideshow/backgrounds/Background_Panel";
import { motion } from "framer-motion";
import React from "react";

export function Background_Welcome() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-white bg-[radial-gradient(#000000_1.5px,transparent_1.5px)] [background-size:20px_20px]"
        animate={{
          backgroundPosition: ["-40px -40px", "0px 0px"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <Background_Panel bg_color={"slate"} />
    </div>
  );
}
