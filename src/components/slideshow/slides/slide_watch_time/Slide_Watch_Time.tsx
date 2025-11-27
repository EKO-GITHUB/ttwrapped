import { get_skill_you_could_have_learned } from "@/components/slideshow/slides/slide_watch_time/skill_you_could_have_learned";
import { useData_store } from "@/stores/useData_store";

export function Slide_Watch_Time() {
  const stats = useData_store((state) => state.stats);
  if (!stats) return null;

  const hours = stats.watch.total_watch_time_hours;

  const minutes = Math.round(hours * 60);
  const days = hours / 24;
  return (
    <>
      <p className="mb-4 text-lg font-medium opacity-80">Estimated Watch Time</p>
      <p className="mb-4 text-7xl font-bold">{minutes} min</p>
      <p className="mb-6 text-lg opacity-70">
        {days >= 7
          ? `That's ~${Math.round(days)} days of your life!`
          : days >= 1
            ? `~${Math.round(days)} full days of content`
            : "Time flies when you're scrolling"}
      </p>
      <p className={"max-w-lg text-sm opacity-70"}>{get_skill_you_could_have_learned(minutes)}</p>
    </>
  );
}
