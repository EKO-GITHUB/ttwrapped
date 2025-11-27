import { format_number } from "@/components/slideshow/format_number";
import { useData_store } from "@/stores/useData_store";

export function Slide_Videos() {
  const stats = useData_store((state) => state.stats);

  const watch_count = stats!.watch.total_videos;

  return (
    <>
      <p className="mb-4 text-lg font-medium opacity-80">Videos Watched</p>
      <p className="mb-4 text-7xl font-bold">{format_number(watch_count)}</p>
      <p className="text-xl opacity-80">{watch_count > 1000 ? "That's a lot of scrolling!" : "Every swipe counts"}</p>
    </>
  );
}
