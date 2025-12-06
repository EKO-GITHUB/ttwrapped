"use client";

import { motion } from "framer-motion";
import React from "react";

export const slide_backgrounds_config: Record<string, React.ReactNode> = {
  welcome: (
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
      <div className="absolute inset-0 h-[90%] w-[85%] translate-x-[10%] translate-y-[5%] overflow-hidden rounded-xl">
        <div className="absolute top-0 h-full w-full bg-slate-900"></div>
      </div>
    </div>
  ),
};
