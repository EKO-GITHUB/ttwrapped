"use client";

import { motion } from "framer-motion";
import React, { useMemo } from "react";

const TOTAL_BACKGROUNDS = 93;
const COLUMN_COUNT = 24;
const SNIPPETS_PER_COLUMN = 20;
const SNIPPET_HEIGHT = 192;
const SNIPPET_WIDTH = 108;
const SNIPPET_GAP = 10;

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
      style={{ width: "200px" }}
    >
      <motion.div
        className="flex flex-col"
        style={{ gap: `${SNIPPET_GAP}px` }}
        initial={{ y: direction === -1 ? 0 : -total_height }}
        animate={{
          y: direction === -1 ? -total_height : 0,
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
        {background_indices.map((bg_index, i) => render_snippet(bg_index, `c-${i}`))}
      </motion.div>
    </div>
  );
}
