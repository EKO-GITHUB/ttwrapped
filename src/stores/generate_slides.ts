import { Slide } from "@/stores/types";
import React from "react";
import { Slide_Videos } from "@/components/slideshow/slides/Slide_Videos";
import { Slide_Watch_Time } from "@/components/slideshow/slides/slide_watch_time/Slide_Watch_Time";
import { Slide_Sessions } from "@/components/slideshow/slides/Slide_Sessions";
import { Slide_Daily_Average } from "@/components/slideshow/slides/Slide_Daily_Average";
import { Slide_Download_Size } from "@/components/slideshow/slides/slide_download_size/Slide_Download_Size";
import { Slide_Likes } from "@/components/slideshow/slides/Slide_Likes";
import { Slide_Comments } from "@/components/slideshow/slides/Slide_Comments";
import { Slide_Shares } from "@/components/slideshow/slides/Slide_Shares";
import { Slide_Direct_Messages } from "@/components/slideshow/slides/Slide_Direct_Messages";
import { Slide_Overview } from "@/components/slideshow/slides/slide_overview/Slide_Overview";
import { Slide_Complete } from "@/components/slideshow/slides/Slide_Complete";
import { Slide_Welcome } from "@/components/slideshow/slides/Slide_Welcome";

export function generate_slides(backgrounds: string[] | undefined): Slide[] {
  if (!backgrounds || backgrounds.length === 0) return [];

  let bg_index = 0;
  const unique_bg = () => backgrounds[bg_index++];

  return [
    {
      id: "welcome",
      bg_image: unique_bg(),
      content: React.createElement(Slide_Welcome),
    },
    {
      id: "videos",
      bg_image: unique_bg(),
      content: React.createElement(Slide_Videos),
    },
    {
      id: "watch_time",
      bg_image: unique_bg(),
      content: React.createElement(Slide_Watch_Time),
    },
    {
      id: "sessions",
      bg_image: unique_bg(),
      content: React.createElement(Slide_Sessions),
    },
    {
      id: "daily_avg",
      bg_image: unique_bg(),
      content: React.createElement(Slide_Daily_Average),
    },
    {
      id: "download_size",
      bg_image: unique_bg(),
      content: React.createElement(Slide_Download_Size),
    },
    {
      id: "likes",
      bg_image: unique_bg(),
      content: React.createElement(Slide_Likes),
    },
    {
      id: "comments",
      bg_image: unique_bg(),
      content: React.createElement(Slide_Comments),
    },
    {
      id: "shares",
      bg_image: unique_bg(),
      content: React.createElement(Slide_Shares),
    },
    {
      id: "direct_messages",
      bg_image: unique_bg(),
      content: React.createElement(Slide_Direct_Messages),
    },
    {
      id: "overview",
      bg_image: unique_bg(),
      content: React.createElement(Slide_Overview),
    },
    {
      id: "complete",
      bg_image: unique_bg(),
      content: React.createElement(Slide_Complete),
    },
  ];
}
