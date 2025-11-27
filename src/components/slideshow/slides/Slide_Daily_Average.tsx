import { format_number } from "@/components/slideshow/format_number";
import { useData_store } from "@/stores/useData_store";

export function Slide_Daily_Average() {
  const stats = useData_store((state) => state.stats);
  if (!stats) return null;

  const videos_per_day = stats.watch.videos_per_day_avg;
  const total_videos = stats.watch.total_videos;

  const INDUSTRY_COMPLETION_RATE = 0.65;
  const estimated_completed = Math.round(total_videos * INDUSTRY_COMPLETION_RATE);

  return (
    <>
      <p className="mb-4 text-lg font-medium opacity-80">Daily Average</p>
      <p className="mb-2 text-7xl font-bold">{Math.round(videos_per_day)}</p>
      <p className="text-xl opacity-80">videos shown per active day</p>
      <p className="mb-6 text-lg opacity-60">
        {videos_per_day >= 100 ? "The algorithm kept you busy!" : "That's a lot of scrolling"}
      </p>

      <p className="mb-2 text-sm font-medium tracking-wide uppercase opacity-60">Estimated Completions</p>
      <p className="text-4xl font-bold">~{format_number(estimated_completed)}</p>
      <p className="mt-1 text-base opacity-70">videos watched to the end</p>
      <p className="mt-1 text-sm opacity-50">Based on 65% industry completion rate</p>
    </>
  );
}
