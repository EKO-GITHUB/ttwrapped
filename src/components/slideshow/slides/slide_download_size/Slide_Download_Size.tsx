import { format_gb } from "@/components/slideshow/format_gb";
import { get_download_equivalent } from "@/components/slideshow/slides/slide_download_size/get_download_equivalent";
import { useData_store } from "@/stores/useData_store";

export function Slide_Download_Size() {
  const stats = useData_store((state) => state.stats);
  if (!stats) return null;

  const gb = stats.watch.estimated_download_gb;

  return (
    <>
      <p className="mb-4 text-lg font-medium opacity-80">If You Downloaded It All</p>
      <p className="mb-4 text-7xl font-bold">{format_gb(gb)}</p>
      <p className={"max-w-lg text-sm opacity-70"}>{get_download_equivalent(gb)}</p>
    </>
  );
}
