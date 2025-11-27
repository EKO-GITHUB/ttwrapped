import { format_number } from "@/components/slideshow/format_number";
import { useData_store } from "@/stores/useData_store";

export function Slide_Likes() {
  const stats = useData_store((state) => state.stats);
  if (!stats) return null;

  const like_count = stats.like_count;
  const favorite_count = stats.favorite_count;

  return (
    <>
      <p className="mb-4 text-lg font-medium opacity-80">Videos Liked</p>
      <p className="mb-2 text-7xl font-bold">{format_number(like_count)}</p>
      <p className="mb-6 text-xl opacity-80">Spreading the love</p>

      <p className="mb-2 text-sm font-medium tracking-wide uppercase opacity-60">Favorites Saved</p>
      <p className="text-4xl font-bold">{format_number(favorite_count)}</p>
      <p className="mt-1 text-base opacity-70">Your personal collection</p>
    </>
  );
}
