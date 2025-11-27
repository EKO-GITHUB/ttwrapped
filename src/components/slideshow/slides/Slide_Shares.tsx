import { format_number } from "@/components/slideshow/format_number";
import { useData_store } from "@/stores/useData_store";

export function Slide_Shares() {
  const stats = useData_store((state) => state.stats);
  if (!stats) return null;

  const share_count = stats.share_count;

  return (
    <>
      <p className="mb-4 text-lg font-medium opacity-80">Videos Shared</p>
      <p className="mb-4 text-7xl font-bold">{format_number(share_count)}</p>
      <p className="text-xl opacity-80">
        {share_count > 50 ? "Sharing is caring!" : "Keeping the good stuff to yourself"}
      </p>
    </>
  );
}
