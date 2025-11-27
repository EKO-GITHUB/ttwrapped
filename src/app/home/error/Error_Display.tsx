"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { useData_store } from "@/stores/useData_store";

export default function Error_Display() {
  const error = useData_store((state) => state.error);
  const set_error = useData_store((state) => state.set_error);

  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-8 dark:border-red-900/50 dark:bg-red-950/20">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
          <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>

        <h2 className="mb-2 text-2xl font-bold text-red-900 dark:text-red-100">Oops! Something went wrong</h2>

        <p className="mb-6 max-w-md text-red-700 dark:text-red-300">{error}</p>

        <button
          onClick={() => set_error(null)}
          className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-medium text-white transition-colors hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      </div>
    </div>
  );
}
