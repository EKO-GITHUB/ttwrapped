"use client";

import { motion } from "framer-motion";
import React, { useMemo } from "react";

const TOTAL_BACKGROUNDS = 57;
const COLUMN_COUNT = 12;
const SNIPPETS_PER_COLUMN = 7;
const SNIPPET_HEIGHT = 180;
const SNIPPET_GAP = 16;

type Scrolling_Column_Props = {
  index: number;
  background_indices: number[];
};

export function Scrolling_Background_Snippets() {
  const columns = useMemo(() => {
    return Array.from({ length: COLUMN_COUNT }, () =>
      Array.from({ length: SNIPPETS_PER_COLUMN }, () => Math.floor(Math.random() * TOTAL_BACKGROUNDS) + 1),
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute flex"
        style={{
          transform: "rotate(45deg)",
          transformOrigin: "center center",
          width: "200%",
          height: "200%",
          left: "-50%",
          top: "-50%",
          gap: `${SNIPPET_GAP}px`,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {columns.map((background_indices, index) => (
          <Scrolling_Column
            key={index}
            index={index}
            background_indices={background_indices}
          />
        ))}
      </div>
    </div>
  );
}

function Scrolling_Column({ index, background_indices }: Scrolling_Column_Props) {
  const direction = index % 2 === 0 ? -1 : 1;
  const total_height = SNIPPETS_PER_COLUMN * (SNIPPET_HEIGHT + SNIPPET_GAP);
  const duration = 35 + index * 3;

  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: "200px" }}
    >
      <motion.div
        className="flex flex-col"
        style={{ gap: `${SNIPPET_GAP}px` }}
        initial={{ y: 0 }}
        animate={{
          y: direction === -1 ? -total_height : total_height,
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
      >
        {background_indices.map((bg_index, i) => (
          <div
            key={`a-${i}`}
            className="flex-shrink-0 overflow-hidden rounded-lg"
            style={{
              height: `${SNIPPET_HEIGHT}px`,
              width: "200px",
              backgroundImage: `url(/slideshow_backgrounds/bg-slide-${bg_index}.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.2,
              filter: "blur(1px)",
            }}
          />
        ))}
        {background_indices.map((bg_index, i) => (
          <div
            key={`b-${i}`}
            className="flex-shrink-0 overflow-hidden rounded-lg"
            style={{
              height: `${SNIPPET_HEIGHT}px`,
              width: "200px",
              backgroundImage: `url(/slideshow_backgrounds/bg-slide-${bg_index}.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.2,
              filter: "blur(1px)",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
