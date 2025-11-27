import { useMemo } from "react";
import { Comment_Item } from "@/types/TikTok_Data_Schema";

export default function Analytics_Section({ comments }: { comments: Comment_Item[] }) {
  const analytics = useMemo(() => {
    const total_comments = comments.length;
    const avg_length = calculate_avg_comment_length(comments);
    const longest = get_longest_comment(comments);
    const shortest = get_shortest_comment(comments);
    const median = calculate_median_length(comments);

    const most_used_emoji = get_most_used_emoji(comments);
    const emoji_stats = calculate_emoji_stats(comments);
    const mention_stats = calculate_mention_stats(comments);
    const hashtag_stats = calculate_hashtag_stats(comments);

    const comments_by_month = group_comments_by_month(comments);
    const avg_per_month = comments_by_month.size > 0 ? (total_comments / comments_by_month.size).toFixed(1) : "0";
    const most_recent = get_most_recent_comment(comments);
    const most_active_month = get_most_active_month(comments_by_month);

    const comments_this_year = get_comments_this_year(comments);
    const comments_this_month = get_comments_this_month(comments);

    return {
      total_comments,
      avg_length,
      longest,
      shortest,
      median,
      most_used_emoji,
      emoji_stats,
      mention_stats,
      hashtag_stats,
      avg_per_month,
      most_recent,
      most_active_month,
      comments_this_year,
      comments_this_month,
    };
  }, [comments]);

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
      <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
        <Metric
          label="Total Comments"
          value={analytics.total_comments}
        />
        <Metric
          label="Avg. per Month"
          value={analytics.avg_per_month}
          subtext="comments"
        />
        <Metric
          label="Most Recent"
          value={analytics.most_recent.formatted}
          subtext={analytics.most_recent.relative}
        />
        <Metric
          label="Most Active"
          value={analytics.most_active_month.month}
          subtext={`${analytics.most_active_month.count} comments`}
        />
        <Metric
          label="Avg. Length"
          value={analytics.avg_length}
          subtext="characters"
        />
        <Metric
          label="Longest Comment"
          value={`${analytics.longest.length} chars`}
        />
        <Metric
          label="Shortest Comment"
          value={`${analytics.shortest} chars`}
        />
        <Metric
          label="Median Length"
          value={`${analytics.median} chars`}
        />
        <Metric
          label="Most Used Emoji"
          value={analytics.most_used_emoji.emoji}
          subtext={`used ${analytics.most_used_emoji.count} times`}
        />
        <Metric
          label="With Emojis"
          value={`${analytics.emoji_stats.percentage}%`}
          subtext={`${analytics.emoji_stats.count} comments`}
        />
        <Metric
          label="With Mentions"
          value={`${analytics.mention_stats.percentage}%`}
          subtext={`${analytics.mention_stats.count} comments`}
        />
        <Metric
          label="With Hashtags"
          value={`${analytics.hashtag_stats.percentage}%`}
          subtext={`${analytics.hashtag_stats.count} comments`}
        />
        <Metric
          label="This Year"
          value={analytics.comments_this_year}
          subtext="comments"
        />
        <Metric
          label="This Month"
          value={analytics.comments_this_month}
          subtext="comments"
        />
      </div>
    </div>
  );
}

function calculate_avg_comment_length(comments: Comment_Item[]) {
  if (comments.length === 0) return "0";
  const total_length = comments.reduce((sum, c) => sum + c.comment.length, 0);
  return (total_length / comments.length).toFixed(1);
}

function get_longest_comment(comments: Comment_Item[]) {
  if (comments.length === 0) return { length: 0, preview: "N/A" };
  const longest = comments.reduce((max, c) => (c.comment.length > max.comment.length ? c : max));
  return { length: longest.comment.length, preview: longest.comment.substring(0, 50) };
}

function get_shortest_comment(comments: Comment_Item[]) {
  if (comments.length === 0) return 0;
  const shortest = comments.reduce((min, c) => (c.comment.length < min.comment.length ? c : min));
  return shortest.comment.length;
}

function calculate_median_length(comments: Comment_Item[]) {
  if (comments.length === 0) return 0;
  const lengths = comments.map((c) => c.comment.length).sort((a, b) => a - b);
  const mid = Math.floor(lengths.length / 2);
  return lengths.length % 2 === 0 ? Math.round((lengths[mid - 1] + lengths[mid]) / 2) : lengths[mid];
}

function get_most_used_emoji(comments: Comment_Item[]) {
  const emoji_regex = /\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu;
  const emoji_counts = new Map<string, number>();

  comments.forEach((c) => {
    const emojis = c.comment.match(emoji_regex) || [];
    emojis.forEach((emoji) => {
      emoji_counts.set(emoji, (emoji_counts.get(emoji) || 0) + 1);
    });
  });

  if (emoji_counts.size === 0) return { emoji: "N/A", count: 0 };

  let most_used = { emoji: "", count: 0 };
  emoji_counts.forEach((count, emoji) => {
    if (count > most_used.count) {
      most_used = { emoji, count };
    }
  });

  return most_used;
}

function calculate_emoji_stats(comments: Comment_Item[]) {
  if (comments.length === 0) return { count: 0, percentage: 0 };
  const emoji_regex = /\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu;
  const count = comments.filter((c) => emoji_regex.test(c.comment)).length;
  return { count, percentage: Math.round((count / comments.length) * 100) };
}

function calculate_mention_stats(comments: Comment_Item[]) {
  if (comments.length === 0) return { count: 0, percentage: 0 };
  const mention_regex = /@\w+/g;
  const count = comments.filter((c) => mention_regex.test(c.comment)).length;
  return { count, percentage: Math.round((count / comments.length) * 100) };
}

function calculate_hashtag_stats(comments: Comment_Item[]) {
  if (comments.length === 0) return { count: 0, percentage: 0 };
  const hashtag_regex = /#\w+/g;
  const count = comments.filter((c) => hashtag_regex.test(c.comment)).length;
  return { count, percentage: Math.round((count / comments.length) * 100) };
}

function group_comments_by_month(comments: Comment_Item[]) {
  const comments_by_month = new Map<string, number>();
  comments.forEach((c) => {
    const date = new Date(c.date);
    const month_key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    comments_by_month.set(month_key, (comments_by_month.get(month_key) || 0) + 1);
  });
  return comments_by_month;
}

function get_most_active_month(comments_by_month: Map<string, number>) {
  if (comments_by_month.size === 0) return { month: "N/A", count: 0 };

  let most_active = { month: "", count: 0 };
  comments_by_month.forEach((count, month_key) => {
    if (count > most_active.count) {
      most_active = { month: month_key, count };
    }
  });

  const [year, month] = most_active.month.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  const formatted_month = date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  return { month: formatted_month, count: most_active.count };
}

function get_most_recent_comment(comments: Comment_Item[]) {
  if (comments.length === 0) return { formatted: "N/A", relative: "" };

  const most_recent = comments.reduce((latest, c) => {
    const c_date = new Date(c.date);
    const latest_date = new Date(latest.date);
    return c_date > latest_date ? c : latest;
  });

  const date = new Date(most_recent.date);
  const formatted = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const now = new Date();
  const days_ago = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  const relative = days_ago === 0 ? "today" : days_ago === 1 ? "yesterday" : `${days_ago} days ago`;

  return { formatted, relative };
}

function get_comments_this_year(comments: Comment_Item[]) {
  const current_year = new Date().getFullYear();
  return comments.filter((c) => new Date(c.date).getFullYear() === current_year).length;
}

function get_comments_this_month(comments: Comment_Item[]) {
  const now = new Date();
  const current_year = now.getFullYear();
  const current_month = now.getMonth();
  return comments.filter((c) => {
    const date = new Date(c.date);
    return date.getFullYear() === current_year && date.getMonth() === current_month;
  }).length;
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
