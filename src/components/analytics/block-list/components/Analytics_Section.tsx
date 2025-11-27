import { useMemo } from "react";
import { Block_List_Item } from "@/types/TikTok_Data_Schema";

export default function Analytics_Section({ blocked_users }: { blocked_users: Block_List_Item[] }) {
  const analytics = useMemo(() => {
    const total_blocks = blocked_users.length;
    const blocks_this_year = get_blocks_this_year(blocked_users);
    const blocks_this_month = get_blocks_this_month(blocked_users);
    const most_recent = get_most_recent_block(blocked_users);

    const blocks_by_month = group_blocks_by_month(blocked_users);
    const avg_per_month = blocks_by_month.size > 0 ? (total_blocks / blocks_by_month.size).toFixed(1) : "0";
    const peak_month = get_peak_month(blocks_by_month);
    const first_block = get_first_block(blocked_users);
    const days_since_last = get_days_since_last(blocked_users);

    return {
      total_blocks,
      blocks_this_year,
      blocks_this_month,
      most_recent,
      avg_per_month,
      peak_month,
      first_block,
      days_since_last,
    };
  }, [blocked_users]);

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
      <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
        <Metric
          label="Total Blocks"
          value={analytics.total_blocks}
        />
        <Metric
          label="Blocks This Year"
          value={analytics.blocks_this_year}
          subtext="blocks"
        />
        <Metric
          label="Blocks This Month"
          value={analytics.blocks_this_month}
          subtext="blocks"
        />
        <Metric
          label="Most Recent"
          value={analytics.most_recent.formatted}
          subtext={analytics.most_recent.relative}
        />
        <Metric
          label="Avg. per Month"
          value={analytics.avg_per_month}
          subtext="blocks"
        />
        <Metric
          label="Peak Month"
          value={analytics.peak_month.month}
          subtext={`${analytics.peak_month.count} blocks`}
        />
        <Metric
          label="First Block"
          value={analytics.first_block}
        />
        <Metric
          label="Days Since Last"
          value={analytics.days_since_last}
          subtext="days"
        />
      </div>
    </div>
  );
}

function get_blocks_this_year(blocked_users: Block_List_Item[]) {
  const current_year = new Date().getFullYear();
  return blocked_users.filter((b) => new Date(b.Date).getFullYear() === current_year).length;
}

function get_blocks_this_month(blocked_users: Block_List_Item[]) {
  const now = new Date();
  const current_year = now.getFullYear();
  const current_month = now.getMonth();
  return blocked_users.filter((b) => {
    const date = new Date(b.Date);
    return date.getFullYear() === current_year && date.getMonth() === current_month;
  }).length;
}

function get_most_recent_block(blocked_users: Block_List_Item[]) {
  if (blocked_users.length === 0) return { formatted: "N/A", relative: "" };

  const most_recent = blocked_users.reduce((latest, b) => {
    const b_date = new Date(b.Date);
    const latest_date = new Date(latest.Date);
    return b_date > latest_date ? b : latest;
  });

  const date = new Date(most_recent.Date);
  const formatted = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const now = new Date();
  const days_ago = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  const relative = days_ago === 0 ? "today" : days_ago === 1 ? "yesterday" : `${days_ago} days ago`;

  return { formatted, relative };
}

function group_blocks_by_month(blocked_users: Block_List_Item[]) {
  const blocks_by_month = new Map<string, number>();
  blocked_users.forEach((b) => {
    const date = new Date(b.Date);
    const month_key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    blocks_by_month.set(month_key, (blocks_by_month.get(month_key) || 0) + 1);
  });
  return blocks_by_month;
}

function get_peak_month(blocks_by_month: Map<string, number>) {
  if (blocks_by_month.size === 0) return { month: "N/A", count: 0 };

  let most_active = { month: "", count: 0 };
  blocks_by_month.forEach((count, month_key) => {
    if (count > most_active.count) {
      most_active = { month: month_key, count };
    }
  });

  const [year, month] = most_active.month.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  const formatted_month = date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  return { month: formatted_month, count: most_active.count };
}

function get_first_block(blocked_users: Block_List_Item[]) {
  if (blocked_users.length === 0) return "N/A";

  const first_block = blocked_users.reduce((earliest, b) => {
    const b_date = new Date(b.Date);
    const earliest_date = new Date(earliest.Date);
    return b_date < earliest_date ? b : earliest;
  });

  const date = new Date(first_block.Date);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function get_days_since_last(blocked_users: Block_List_Item[]) {
  if (blocked_users.length === 0) return 0;

  const most_recent = blocked_users.reduce((latest, b) => {
    const b_date = new Date(b.Date);
    const latest_date = new Date(latest.Date);
    return b_date > latest_date ? b : latest;
  });

  const date = new Date(most_recent.Date);
  const now = new Date();
  return Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
}

function Metric({ label, value, subtext }: { label: string; value: string | number; subtext?: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
      <span className="mt-0.5 text-lg font-semibold text-gray-900 dark:text-gray-100">{value}</span>
      {subtext && <span className="text-xs text-gray-500 dark:text-gray-400">{subtext}</span>}
    </div>
  );
}
