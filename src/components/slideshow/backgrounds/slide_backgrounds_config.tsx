"use client";

import { Background_Videos } from "@/components/slideshow/backgrounds/Background_Videos";
import { Background_Welcome } from "@/components/slideshow/backgrounds/Background_Welcome";
import React from "react";

export const slide_backgrounds_config: Record<string, React.ReactNode> = {
  welcome: <Background_Welcome />,
  videos: <Background_Videos />,
  watch_time: <></>,
  sessions: <></>,
  daily_avg: <></>,
  download_size: <></>,
  likes: <></>,
  comments: <></>,
  shares: <></>,
  direct_messages: <></>,
  overview: <></>,
  complete: <></>,
};
