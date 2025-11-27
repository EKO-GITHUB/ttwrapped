"use client";

import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useData_store } from "@/stores/useData_store";

export default function Demo_Button() {
  const is_loading = useData_store((state) => state.is_loading);
  const is_demo_mode = useData_store((state) => state.is_demo_mode);
  const load_demo_data = useData_store((state) => state.load_demo_data);

  const is_disabled = is_loading || is_demo_mode;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2 text-sm text-black/60">
        <div className="h-px flex-1 bg-black/20" />
        <span>OR</span>
        <div className="h-px flex-1 bg-black/20" />
      </div>

      <Button
        variant="outline"
        size="lg"
        onClick={load_demo_data}
        disabled={is_disabled}
        className="gap-2"
      >
        {is_loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
        Show Demo
      </Button>

      <p className="text-center text-sm text-black/60">
        Experience TTWrapped with sample data before uploading your own
      </p>
    </div>
  );
}
