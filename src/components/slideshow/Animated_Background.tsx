"use client";

import { slide_backgrounds_config } from "./backgrounds/slide_backgrounds_config";

type Animated_Background_Props = {
  slide_id: string;
};

export function Animated_Background({ slide_id }: Animated_Background_Props) {
  const background = slide_backgrounds_config[slide_id];

  return <div className="absolute h-full w-full">{background}</div>;
}
