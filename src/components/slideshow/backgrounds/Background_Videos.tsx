"use client";

import { Background_Panel } from "@/components/slideshow/backgrounds/Background_Panel";
import { motion } from "framer-motion";
import React from "react";

export function Background_Videos() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <filter id="noise-filter-videos">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="4"
              seed="2"
              stitchTiles="stitch"
              result="turbulence"
            >
              <animate
                attributeName="baseFrequency"
                values="0.65;0.68;0.65"
                dur="8s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feColorMatrix
              in="turbulence"
              type="saturate"
              values="0.2"
              result="saturated"
            />
            <feComponentTransfer
              in="saturated"
              result="opacity"
            >
              <feFuncA
                type="linear"
                slope="0.5"
              />
            </feComponentTransfer>
          </filter>
          <linearGradient
            id="gradient-videos-1"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#ff0080"
            />
            <stop
              offset="50%"
              stopColor="#7928ca"
            />
            <stop
              offset="100%"
              stopColor="#0070f3"
            />
          </linearGradient>
          <linearGradient
            id="gradient-videos-2"
            x1="100%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#ff4d4d"
            />
            <stop
              offset="50%"
              stopColor="#f9cb28"
            />
            <stop
              offset="100%"
              stopColor="#2ec4b6"
            />
          </linearGradient>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#gradient-videos-1)"
        />
        <motion.rect
          width="100%"
          height="100%"
          fill="url(#gradient-videos-2)"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ mixBlendMode: "overlay" }}
        />
        <rect
          width="100%"
          height="100%"
          filter="url(#noise-filter-videos)"
          opacity="0.6"
        />
      </svg>
      <Background_Panel bg_color={"teal"} />
    </div>
  );
}
