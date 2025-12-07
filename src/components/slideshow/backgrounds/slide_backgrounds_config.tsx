"use client";

import { Background_Daily_Avg } from "@/components/slideshow/backgrounds/Background_Daily_Avg";
import { Background_Likes } from "@/components/slideshow/backgrounds/Background_Likes";
import { Background_Sessions } from "@/components/slideshow/backgrounds/Background_Sessions";
import { Background_Videos } from "@/components/slideshow/backgrounds/Background_Videos";
import { Background_Watch_Time } from "@/components/slideshow/backgrounds/Background_Watch_Time";
import { Background_Welcome } from "@/components/slideshow/backgrounds/Background_Welcome";
import React from "react";

export const slide_backgrounds_config: Record<string, React.ReactNode> = {
  welcome: <Background_Welcome />,
  videos: <Background_Videos />,
  watch_time: <Background_Watch_Time />,
  sessions: <Background_Sessions />,
  daily_avg: <Background_Daily_Avg />,
  download_size: <></>,
  likes: <Background_Likes />,
  comments: <></>,
  shares: <></>,
  direct_messages: <></>,
  overview: <></>,
  complete: <></>,
};
