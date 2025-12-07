"use client";

import type { Slide } from "@/stores/types";
import html2canvas from "html2canvas-pro";
import React from "react";

const EXPORT_WIDTH = 1080;
const EXPORT_HEIGHT = 1920;
const ANIMATION_SETTLE_TIME = 500;
const EXPORT_QUALITY = 1.0;

function Slide_Export_Wrapper({ background, content }: { background: React.ReactNode; content: React.ReactNode }) {
  return React.createElement(
    "div",
    {
      className: "relative flex h-full w-full flex-col overflow-hidden bg-black",
    },
    React.createElement(
      "div",
      {
        className: "absolute z-0 h-full w-full",
      },
      background,
    ),
    React.createElement(
      "div",
      {
        className: "relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center text-white",
      },
      content,
    ),
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
      React.createElement(Slide_Export_Wrapper, {
        background: slide.background,
        content: slide.content,
      }),
    );

    await new Promise((resolve) => setTimeout(resolve, ANIMATION_SETTLE_TIME));

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
