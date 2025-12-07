"use client";

import { cn } from "@/lib/utils";
import type { Slide } from "@/stores/types";
import html2canvas from "html2canvas-pro";
import React from "react";

const EXPORT_WIDTH = 1080 / 2.5;
const EXPORT_HEIGHT = 1920 / 2.5;
const ANIMATION_SETTLE_TIME = 500;
const EXPORT_QUALITY = 1.0;

function Slide_Export_Wrapper({
  background,
  content,
  invert_colors,
  logo_position = "bottom",
}: {
  background: React.ReactNode;
  content: React.ReactNode;
  invert_colors: boolean;
  logo_position?: "top" | "bottom";
}) {
  const logo_section = (
    <div
      className={cn("relative z-10 flex items-center justify-center gap-2", logo_position === "top" ? "pt-4" : "pb-4")}
    >
      <Logo />
      <span className={cn("text-sm font-semibold opacity-90", invert_colors ? "text-black" : "text-white")}>
        TTWrapped
      </span>
    </div>
  );

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden">
      <div className="absolute z-0 h-full w-full">{background}</div>
      {logo_position === "top" && logo_section}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center text-white">
        {content}
      </div>
      {logo_position === "bottom" && logo_section}
    </div>
  );
}

export async function export_slide_as_image(slide: Slide, index: number): Promise<void> {
  const { createRoot } = await import("react-dom/client");

  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "-10000px";
  container.style.left = "-10000px";
  container.style.width = `${EXPORT_WIDTH}px`;
  container.style.height = `${EXPORT_HEIGHT}px`;
  container.style.overflow = "hidden";

  document.body.appendChild(container);

  const root = createRoot(container);

  try {
    root.render(
      <Slide_Export_Wrapper
        background={slide.background}
        content={slide.content}
        invert_colors={index == 1}
        logo_position={index == 5 || index == 6 ? "top" : "bottom"}
      />,
    );

    await new Promise((resolve) => setTimeout(resolve, ANIMATION_SETTLE_TIME));

    await wait_for_images_to_load(container);

    convert_lab_colors_to_rgb(container);

    const canvas = await html2canvas(container, {
      scale: 1,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#000000",
      logging: false,
      onclone: (cloned_document) => {
        const cloned_container = cloned_document.body.querySelector("div");
        if (cloned_container && cloned_container instanceof HTMLElement) {
          cloned_container.style.fontFamily = "TikTok Sans, system-ui, sans-serif";
        }
      },
    });

    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => resolve(blob!), "image/png", EXPORT_QUALITY);
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ttwrapped-${String(index).padStart(2, "0")}-${slide.id}.png`;
    link.click();

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to export slide:", slide.id, error);
    throw new Error(`Failed to export slide ${slide.id}: ${error instanceof Error ? error.message : "Unknown error"}`);
  } finally {
    root.unmount();
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
}

function convert_lab_colors_to_rgb(element: HTMLElement) {
  const all_elements = element.querySelectorAll("*");
  all_elements.forEach((el) => {
    if (el instanceof HTMLElement) {
      const computed = window.getComputedStyle(el);
      const properties_to_check = [
        "color",
        "backgroundColor",
        "borderColor",
        "borderTopColor",
        "borderRightColor",
        "borderBottomColor",
        "borderLeftColor",
        "outlineColor",
      ];

      properties_to_check.forEach((prop) => {
        const value = computed.getPropertyValue(prop);
        if (value && (value.includes("lab(") || value.includes("oklch(") || value.includes("lch("))) {
          const rgb_value = convert_to_rgb(value);
          if (rgb_value) {
            el.style.setProperty(prop, rgb_value);
          }
        }
      });
    }
  });
}

function convert_to_rgb(color_value: string): string | null {
  try {
    const temp_element = document.createElement("div");
    temp_element.style.color = color_value;
    document.body.appendChild(temp_element);
    const computed_color = window.getComputedStyle(temp_element).color;
    document.body.removeChild(temp_element);
    return computed_color || null;
  } catch {
    return null;
  }
}

async function wait_for_images_to_load(container: HTMLElement): Promise<void> {
  const images = container.querySelectorAll("img");
  const promises = Array.from(images).map((img) => {
    if (img.complete) return Promise.resolve();
    return new Promise((resolve) => {
      img.onload = () => resolve(undefined);
      img.onerror = () => resolve(undefined);
      setTimeout(() => resolve(undefined), 2000);
    });
  });
  await Promise.all(promises);
}

function Logo() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 236.56 236.56"
      style={{ flexShrink: 0 }}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect
        x="0.5"
        y="0.5"
        width="235.56"
        height="235.56"
        rx="19"
        ry="19"
        fill="#231f20"
        stroke="#231f20"
        strokeMiterlimit="10"
      />

      {[{ stroke: "#ec4762" }, { stroke: "#65c9d3" }, { stroke: "#fff" }].map(({ stroke }, i) => (
        <g
          key={i}
          stroke={stroke}
          strokeWidth={i === 0 ? 12 : 11}
        >
          <circle
            cx={i === 0 ? 95.61 : i === 1 ? 80.73 : 87.84}
            cy={i === 0 ? 40.46 : i === 1 ? 26.02 : 32.38}
            r="16.55"
          />
          <path
            d={`M${i === 0 ? 122.08 : i === 1 ? 107.2 : 114.3},${i === 0 ? 83.47 : i === 1 ? 69.03 : 75.39}
            c0-14.62-11.85-26.47-26.47-26.47s-26.47,11.85-26.47,26.47`}
            strokeWidth="12"
          />
          <path
            d={`M${i === 0 ? 122.08 - 2.71 : i === 1 ? 112.26 : 119.37},${i === 0 ? 180.44 : i === 1 ? 165.99 : 172.35}v47.79`}
          />
          <path
            d={`M${i === 0 ? 165.36 : i === 1 ? 150.48 : 157.59},${i === 0 ? 161.32 : i === 1 ? 146.87 : 153.23}v66.9`}
          />
          <path
            d={`M${i === 0 ? 203.59 : i === 1 ? 188.71 : 195.82},${i === 0 ? 123.09 : i === 1 ? 108.65 : 115.01}v105.12`}
          />
          <path
            d={`M${i === 0 ? 222.7 : i === 1 ? 207.83 : 214.93},${i === 0 ? 56.19 : i === 1 ? 41.75 : 48.11} 
            l-82.63,82.63c-1.86,1.86-4.89,1.88-6.76,0h0l-31.46-31.46c-1.86-1.86-4.89-1.86-6.76,0l-63.52,63.52`}
          />
          <path
            d={`M${i === 0 ? 50.68 : i === 1 ? 35.8 : 42.91},${i === 0 ? 199.55 : i === 1 ? 185.1 : 191.46}v28.67`}
          />
          <path
            d={`M${i === 0 ? 88.91 : i === 1 ? 74.03 : 81.13},${i === 0 ? 161.32 : i === 1 ? 146.87 : 153.23}v66.9`}
          />
        </g>
      ))}
    </svg>
  );
}
