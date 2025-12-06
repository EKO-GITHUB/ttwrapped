import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const COLOR_TIKTOK_TEAL = "#6bc5d0";
export const COLOR_TIKTOK_RED = "#d54a63";
