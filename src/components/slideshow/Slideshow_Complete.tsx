"use client";

import { export_slide_as_image } from "@/components/slideshow/export_slide_as_image";
import { useData_store } from "@/stores/useData_store";
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
  const set_is_exporting = useData_store((state) => state.set_is_exporting);

  const handle_download = async () => {
    if (!slides || slides.length === 0) return;

    set_is_downloading(true);
    set_download_progress(0);
    set_is_exporting(true);

    const slides_to_export = slides.filter((slide) => slide.id !== "complete");

    try {
      for (let i = 0; i < slides_to_export.length; i++) {
        const slide = slides_to_export[i];
        await export_slide_as_image(slide, i + 1);
        set_download_progress(((i + 1) / slides_to_export.length) * 100);
      }
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      set_is_exporting(false);
      set_is_downloading(false);
      set_download_progress(0);
    }
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
