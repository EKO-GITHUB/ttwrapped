"use client";

import type { Slide } from "@/stores/types";
import { useData_store } from "@/stores/useData_store";
import html2canvas from "html2canvas-pro";
import { BarChart3, Download, RotateCcw, Upload } from "lucide-react";
import { useState } from "react";

export default function Slideshow_Complete() {
  const [is_downloading, set_is_downloading] = useState(false);
  const [download_progress, set_download_progress] = useState(0);

  const go_to_slideshow = useData_store((state) => state.go_to_slideshow);
  const go_to_dashboard = useData_store((state) => state.go_to_dashboard);
  const reset = useData_store((state) => state.reset);
  const is_demo_mode = useData_store((state) => state.is_demo_mode);
  const slides = useData_store((state) => state.slides);

  const handle_download = async () => {
    if (!slides || slides.length === 0) return;

    set_is_downloading(true);
    set_download_progress(0);

    const slides_to_export = slides.filter((slide) => slide.id !== "complete");

    for (let i = 0; i < slides_to_export.length; i++) {
      const slide = slides_to_export[i];
      await export_slide_as_image(slide, i + 1);
      set_download_progress(((i + 1) / slides_to_export.length) * 100);
    }

    set_is_downloading(false);
    set_download_progress(0);
  };

  return (
    <div className="mx-auto w-full max-w-lg overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Your Wrapped is Ready!</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">What would you like to do next?</p>
      </div>

      <div className="grid gap-4 border-t border-gray-200 p-6 dark:border-gray-800">
        {is_demo_mode && (
          <button
            onClick={reset}
            className="flex h-auto flex-col items-center gap-2 rounded-lg bg-blue-600 px-4 py-6 text-white transition-colors hover:bg-blue-700"
          >
            <Upload className="h-8 w-8" />
            <span className="text-lg font-medium">Upload Your Data</span>
            <span className="text-sm opacity-80">Exit demo and upload your own TikTok data</span>
          </button>
        )}

        <button
          onClick={go_to_slideshow}
          className="flex h-auto flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-6 text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
        >
          <RotateCcw className="h-8 w-8" />
          <span className="text-lg font-medium">View Again</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Watch the slideshow one more time</span>
        </button>

        <button
          onClick={handle_download}
          disabled={is_downloading}
          className="flex h-auto flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-6 text-gray-900 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
        >
          <Download className="h-8 w-8" />
          <span className="text-lg font-medium">
            {is_downloading ? `Downloading... ${Math.round(download_progress)}%` : "Download Images"}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Save your wrapped slides as images</span>
        </button>

        <button
          onClick={go_to_dashboard}
          className={`flex h-auto flex-col items-center gap-2 rounded-lg px-4 py-6 transition-colors ${
            is_demo_mode
              ? "border border-gray-200 bg-white text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          <BarChart3 className="h-8 w-8" />
          <span className="text-lg font-medium">View Full Analytics</span>
          <span className={`text-sm ${is_demo_mode ? "text-gray-500 dark:text-gray-400" : "opacity-80"}`}>
            Explore detailed insights about your TikTok data
          </span>
        </button>
      </div>
    </div>
  );
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
            el.style = rgb_value;
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

async function export_slide_as_image(slide: Slide, index: number) {
  const MAX_WIDTH = 1080 / 2.5;
  const MAX_HEIGHT = 1920 / 2.5;

  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "-10000px";
  container.style.left = "-10000px";
  container.style.width = `${MAX_WIDTH}px`;
  container.style.height = `${MAX_HEIGHT}px`;
  container.style.overflow = "hidden";

  const slide_wrapper = document.createElement("div");
  slide_wrapper.style.position = "relative";
  slide_wrapper.style.width = "100%";
  slide_wrapper.style.height = "100%";
  slide_wrapper.style.display = "flex";
  slide_wrapper.style.flexDirection = "column";
  slide_wrapper.style.backgroundColor = "black";

  const background = document.createElement("div");
  background.style.position = "absolute";
  background.style.inset = "0";
  background.style.backgroundSize = "cover";
  background.style.backgroundPosition = "center";
  background.style.opacity = "0.6";

  const content_wrapper = document.createElement("div");
  content_wrapper.style.position = "relative";
  content_wrapper.style.zIndex = "10";
  content_wrapper.style.display = "flex";
  content_wrapper.style.flex = "1";
  content_wrapper.style.flexDirection = "column";
  content_wrapper.style.alignItems = "center";
  content_wrapper.style.justifyContent = "center";
  content_wrapper.style.padding = "24px";
  content_wrapper.style.textAlign = "center";
  content_wrapper.style.color = "white";

  slide_wrapper.appendChild(background);
  slide_wrapper.appendChild(content_wrapper);
  container.appendChild(slide_wrapper);
  document.body.appendChild(container);

  const { createRoot } = await import("react-dom/client");
  const { ExportProvider } = await import("@/contexts/ExportContext");
  const root = createRoot(content_wrapper);
  root.render(<ExportProvider is_exporting={true}>{slide.content}</ExportProvider>);

  await new Promise((resolve) => setTimeout(resolve, 100));

  convert_lab_colors_to_rgb(container);

  try {
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
      canvas.toBlob((blob) => resolve(blob!), "image/png", 1.0);
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `tiktok-wrapped-${String(index).padStart(2, "0")}-${slide.id}.png`;
    link.click();

    URL.revokeObjectURL(url);
  } finally {
    root.unmount();
    document.body.removeChild(container);
  }
}
