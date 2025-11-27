import { useMemo } from "react";
import Activity_Map from "@/components/custom/Activity_Map";
import DeferredRender from "@/components/custom/DeferredRender";
import { create_watch_history_columns } from "./table-columns";
import { Eye, History } from "lucide-react";
import Activity_Table from "@/components/analytics/shared/Activity_Table";

export default function Watch_History_Tab({
  watch_history,
  liked_links,
  favorited_links,
}: {
  watch_history: any[];
  liked_links: Set<string>;
  favorited_links: Set<string>;
}) {
  const enhanced_watch_history = useMemo(
    () =>
      watch_history.map((item) => ({
        ...item,
        is_liked: liked_links.has(item.Link),
        is_favorited: favorited_links.has(item.Link),
      })),
    [watch_history, liked_links, favorited_links],
  );

  const columns = useMemo(() => create_watch_history_columns(), []);

  return (
    <DeferredRender>
      <div className="animate-in fade-in grid w-full min-w-0 grid-cols-1 gap-6 duration-300">
        <h3 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100">
          <Eye className="h-4 w-4" /> Watch History ({enhanced_watch_history.length.toLocaleString() ?? "0"})
        </h3>
        <Activity_Map
          data={watch_history}
          date_field="Date"
          title="Watch History"
          singular_label="video watched"
          plural_label="videos watched"
          color="blue"
        />

        <Activity_Table
          data={enhanced_watch_history}
          columns={columns}
          title="Watch History"
          icon={<History className="h-5 w-5" />}
          searchable={true}
          defaultSorting={[{ id: "Date", desc: true }]}
        />
      </div>
    </DeferredRender>
  );
}
