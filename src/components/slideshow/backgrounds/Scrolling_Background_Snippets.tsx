"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

const TOTAL_BACKGROUNDS = 93;
const COLUMN_COUNT = 24;
const SNIPPETS_PER_COLUMN = 20;
const SNIPPET_HEIGHT = 192;
const SNIPPET_WIDTH = 108;
const SNIPPET_GAP = 15;

type Scrolling_Column_Props = {
  index: number;
  background_indices: number[];
  duration: number;
};

export function Scrolling_Background_Snippets() {
  const [columns] = useState(() => {
    const total_needed = COLUMN_COUNT * SNIPPETS_PER_COLUMN;
    const background_pool: number[] = [];

    while (background_pool.length < total_needed) {
      const shuffled = Array.from({ length: TOTAL_BACKGROUNDS }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
      background_pool.push(...shuffled);
    }

    const distributed_backgrounds = background_pool.slice(0, total_needed);

    return Array.from({ length: COLUMN_COUNT }, (_, col_index) =>
      distributed_backgrounds.slice(col_index * SNIPPETS_PER_COLUMN, (col_index + 1) * SNIPPETS_PER_COLUMN),
    );
  });

  const [durations] = useState(() => Array.from({ length: COLUMN_COUNT }, () => 200 + Math.random() * 150));

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
            duration={durations[index]}
          />
        ))}
      </div>
    </div>
  );
}

function Scrolling_Column({ index, background_indices, duration }: Scrolling_Column_Props) {
  const direction = index % 2 === 0 ? -1 : 1;
  const total_height = SNIPPETS_PER_COLUMN * (SNIPPET_HEIGHT + SNIPPET_GAP);

  const render_snippet = (bg_index: number, key: string) => (
    <div
      key={key}
      className="flex-shrink-0 overflow-hidden rounded-lg"
      style={{
        height: `${SNIPPET_HEIGHT}px`,
        width: `${SNIPPET_WIDTH}px`,
        backgroundImage: `url(/slideshow_backgrounds/video_wall/bg-video-wall-${bg_index}.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.2,
        filter: "blur(1px)",
      }}
    />
  );

  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: "115px" }}
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
        {background_indices.map((bg_index, i) => render_snippet(bg_index, `a-${i}`))}
        {background_indices.map((bg_index, i) => render_snippet(bg_index, `b-${i}`))}
      </motion.div>
    </div>
  );
}
