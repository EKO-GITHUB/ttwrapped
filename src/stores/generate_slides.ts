import { Background_Comments } from "@/components/slideshow/backgrounds/Background_Comments";
import { Background_Complete } from "@/components/slideshow/backgrounds/Background_Complete";
import { Background_Daily_Avg } from "@/components/slideshow/backgrounds/Background_Daily_Avg";
import { Background_Direct_Messages } from "@/components/slideshow/backgrounds/Background_Direct_Messages";
import { Background_Download_Size } from "@/components/slideshow/backgrounds/Background_Download_Size";
import { Background_Likes } from "@/components/slideshow/backgrounds/Background_Likes";
import { Background_Overview } from "@/components/slideshow/backgrounds/Background_Overview";
import { Background_Sessions } from "@/components/slideshow/backgrounds/Background_Sessions";
import { Background_Shares } from "@/components/slideshow/backgrounds/Background_Shares";
import { Background_Videos } from "@/components/slideshow/backgrounds/Background_Videos";
import { Background_Watch_Time } from "@/components/slideshow/backgrounds/Background_Watch_Time";
import { Background_Welcome } from "@/components/slideshow/backgrounds/Background_Welcome";
import { Slide_Comments } from "@/components/slideshow/slides/Slide_Comments";
import { Slide_Complete } from "@/components/slideshow/slides/Slide_Complete";
import { Slide_Daily_Average } from "@/components/slideshow/slides/Slide_Daily_Average";
import { Slide_Direct_Messages } from "@/components/slideshow/slides/Slide_Direct_Messages";
import { Slide_Likes } from "@/components/slideshow/slides/Slide_Likes";
import { Slide_Sessions } from "@/components/slideshow/slides/Slide_Sessions";
import { Slide_Shares } from "@/components/slideshow/slides/Slide_Shares";
import { Slide_Videos } from "@/components/slideshow/slides/Slide_Videos";
import { Slide_Welcome } from "@/components/slideshow/slides/Slide_Welcome";
import { Slide_Download_Size } from "@/components/slideshow/slides/slide_download_size/Slide_Download_Size";
import { Slide_Overview } from "@/components/slideshow/slides/slide_overview/Slide_Overview";
import { Slide_Watch_Time } from "@/components/slideshow/slides/slide_watch_time/Slide_Watch_Time";
import { Slide } from "@/stores/types";
import React from "react";

export function generate_slides(): Slide[] {
  return [
    {
      id: "welcome",
      background: React.createElement(Background_Welcome),
      content: React.createElement(Slide_Welcome),
    },
    {
      id: "videos",
      background: React.createElement(Background_Videos),
      content: React.createElement(Slide_Videos),
    },
    {
      id: "watch_time",
      background: React.createElement(Background_Watch_Time),
      content: React.createElement(Slide_Watch_Time),
    },
    {
      id: "sessions",
      background: React.createElement(Background_Sessions),
      content: React.createElement(Slide_Sessions),
    },
    {
      id: "daily_avg",
      background: React.createElement(Background_Daily_Avg),
      content: React.createElement(Slide_Daily_Average),
    },
    {
      id: "download_size",
      background: React.createElement(Background_Download_Size),
      content: React.createElement(Slide_Download_Size),
    },
    {
      id: "likes",
      background: React.createElement(Background_Likes),
      content: React.createElement(Slide_Likes),
    },
    {
      id: "comments",
      background: React.createElement(Background_Comments),
      content: React.createElement(Slide_Comments),
    },
    {
      id: "shares",
      background: React.createElement(Background_Shares),
      content: React.createElement(Slide_Shares),
    },
    {
      id: "direct_messages",
      background: React.createElement(Background_Direct_Messages),
      content: React.createElement(Slide_Direct_Messages),
    },
    {
      id: "overview",
      background: React.createElement(Background_Overview),
      content: React.createElement(Slide_Overview),
    },
    {
      id: "complete",
      background: React.createElement(Background_Complete),
      content: React.createElement(Slide_Complete),
    },
  ];
}
