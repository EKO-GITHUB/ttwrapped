import { format_number } from "@/components/slideshow/format_number";
import { useData_store } from "@/stores/useData_store";

export function Slide_Sessions() {
  const stats = useData_store((state) => state.stats);
  if (!stats) return null;

  const count = stats.watch.session_count;
  const avg_minutes = stats.watch.avg_session_minutes;
  const avg_videos = stats.watch.avg_session_videos;
  const longest_videos = stats.watch.longest_session_videos;
  const longest_minutes = stats.watch.longest_session_minutes;
  const longest_date = stats.watch.longest_session_date;

  const longest_hours = longest_minutes / 60;
  const formatted_date = longest_date?.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <p className="mb-4 text-lg font-medium opacity-80">Watch Sessions</p>
      <p className="mb-2 text-7xl font-bold">{format_number(count)}</p>
      <p className="text-xl opacity-80">~{Math.round(avg_videos)} videos per session</p>
      <p className="mb-6 text-lg opacity-60">~{Math.round(avg_minutes)} min average</p>

      <p className="mb-2 text-sm font-medium tracking-wide uppercase opacity-60">Longest Session</p>
      <p className="text-4xl font-bold">{longest_videos} videos</p>
      <p className="mt-1 text-base opacity-70">
        {longest_hours >= 1
          ? `~${longest_hours.toFixed(1)} hours of scrolling`
          : `~${Math.round(longest_minutes)} min of scrolling`}
      </p>
      {formatted_date && <p className="mt-1 text-sm opacity-50">on {formatted_date}</p>}
    </>
  );
}
