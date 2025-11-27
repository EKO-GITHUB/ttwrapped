import { useMemo } from "react";

type Live_Stream_With_ID = {
  stream_id: string;
  WatchTime: string;
  Link: string;
  Comments: Array<{
    CommentTime: string;
    CommentContent: string;
    RawTime: number;
  }>;
  Questions: null;
};

export default function Analytics_Section({ live_streams }: { live_streams: Live_Stream_With_ID[] }) {
  const analytics = useMemo(() => {
    const total_streams = live_streams.length;
    const total_comments = get_total_comments(live_streams);
    const streams_this_year = get_streams_this_year(live_streams);
    const streams_this_month = get_streams_this_month(live_streams);
    const most_recent = get_most_recent_stream(live_streams);
    const avg_comments_per_stream = get_avg_comments_per_stream(live_streams);
    const streams_by_month = group_streams_by_month(live_streams);
    const peak_month = get_peak_month(streams_by_month);
    const with_comments = get_streams_with_comments(live_streams);

    return {
      total_streams,
      total_comments,
      streams_this_year,
      streams_this_month,
      most_recent,
      avg_comments_per_stream,
      peak_month,
      with_comments,
    };
  }, [live_streams]);

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
      <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
        <Metric
          label="Total Streams"
          value={analytics.total_streams}
        />
        <Metric
          label="Total Comments"
          value={analytics.total_comments}
          subtext="across all streams"
        />
        <Metric
          label="Streams This Year"
          value={analytics.streams_this_year}
          subtext="streams"
        />
        <Metric
          label="Streams This Month"
          value={analytics.streams_this_month}
          subtext="streams"
        />
        <Metric
          label="Most Recent"
          value={analytics.most_recent.formatted}
          subtext={analytics.most_recent.relative}
        />
        <Metric
          label="Avg. Comments/Stream"
          value={analytics.avg_comments_per_stream}
          subtext="comments"
        />
        <Metric
          label="Peak Month"
          value={analytics.peak_month.month}
          subtext={`${analytics.peak_month.count} streams`}
        />
        <Metric
          label="With Comments"
          value={`${analytics.with_comments.percentage}%`}
          subtext={`${analytics.with_comments.count} streams`}
        />
      </div>
    </div>
  );
}

function get_total_comments(live_streams: Live_Stream_With_ID[]) {
  return live_streams.reduce((total, stream) => total + stream.Comments.length, 0);
}

function get_streams_this_year(live_streams: Live_Stream_With_ID[]) {
  const current_year = new Date().getFullYear();
  return live_streams.filter((s) => new Date(s.WatchTime).getFullYear() === current_year).length;
}

function get_streams_this_month(live_streams: Live_Stream_With_ID[]) {
  const now = new Date();
  const current_year = now.getFullYear();
  const current_month = now.getMonth();
  return live_streams.filter((s) => {
    const date = new Date(s.WatchTime);
    return date.getFullYear() === current_year && date.getMonth() === current_month;
  }).length;
}

function get_most_recent_stream(live_streams: Live_Stream_With_ID[]) {
  if (live_streams.length === 0) return { formatted: "N/A", relative: "" };

  const most_recent = live_streams.reduce((latest, s) => {
    const s_date = new Date(s.WatchTime);
    const latest_date = new Date(latest.WatchTime);
    return s_date > latest_date ? s : latest;
  });

  const date = new Date(most_recent.WatchTime);
  const formatted = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const now = new Date();
  const days_ago = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  const relative = days_ago === 0 ? "today" : days_ago === 1 ? "yesterday" : `${days_ago} days ago`;

  return { formatted, relative };
}

function get_avg_comments_per_stream(live_streams: Live_Stream_With_ID[]) {
  if (live_streams.length === 0) return "0";
  const total_comments = get_total_comments(live_streams);
  return (total_comments / live_streams.length).toFixed(1);
}

function group_streams_by_month(live_streams: Live_Stream_With_ID[]) {
  const streams_by_month = new Map<string, number>();
  live_streams.forEach((s) => {
    const date = new Date(s.WatchTime);
    const month_key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    streams_by_month.set(month_key, (streams_by_month.get(month_key) || 0) + 1);
  });
  return streams_by_month;
}

function get_peak_month(streams_by_month: Map<string, number>) {
  if (streams_by_month.size === 0) return { month: "N/A", count: 0 };

  let most_active = { month: "", count: 0 };
  streams_by_month.forEach((count, month_key) => {
    if (count > most_active.count) {
      most_active = { month: month_key, count };
    }
  });

  const [year, month] = most_active.month.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  const formatted_month = date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  return { month: formatted_month, count: most_active.count };
}

function get_streams_with_comments(live_streams: Live_Stream_With_ID[]) {
  const count = live_streams.filter((stream) => stream.Comments.length > 0).length;
  const percentage = live_streams.length > 0 ? Math.round((count / live_streams.length) * 100) : 0;
  return { count, percentage };
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
