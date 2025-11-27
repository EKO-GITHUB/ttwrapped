import { useMemo } from "react";
import { Post_Item } from "@/types/TikTok_Data_Schema";

export default function Analytics_Section({ posts }: { posts: Post_Item[] }) {
  const analytics = useMemo(() => {
    const total_posts = posts.length;
    const total_likes = calculate_total_likes(posts);
    const avg_likes = total_posts > 0 ? (total_likes / total_posts).toFixed(1) : "0";
    const most_liked = get_most_liked_post(posts);
    const zero_likes_count = posts.filter((p) => parseInt(p.Likes, 10) === 0).length;

    const privacy_dist = calculate_privacy_distribution(posts);
    const comments_enabled_pct = calculate_engagement_percentage(posts, "AllowComments");
    const duets_enabled_pct = calculate_engagement_percentage(posts, "AllowDuets");
    const stitches_enabled_pct = calculate_engagement_percentage(posts, "AllowStitches");

    const posts_by_month = group_posts_by_month(posts);
    const avg_posts_per_month = posts_by_month.size > 0 ? (total_posts / posts_by_month.size).toFixed(1) : "0";
    const most_recent_post = get_most_recent_post(posts);
    const most_active_month = get_most_active_month(posts_by_month);

    return {
      total_posts,
      avg_likes,
      total_likes,
      most_liked,
      zero_likes_count,
      privacy_dist,
      comments_enabled_pct,
      duets_enabled_pct,
      stitches_enabled_pct,
      avg_posts_per_month,
      most_recent_post,
      most_active_month,
    };
  }, [posts]);

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
      <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
        <Metric
          label="Total Posts"
          value={analytics.total_posts}
        />
        <Metric
          label="Avg. Likes"
          value={analytics.avg_likes}
          subtext="per post"
        />
        <Metric
          label="Total Likes"
          value={analytics.total_likes.toLocaleString()}
        />
        <Metric
          label="Most Liked"
          value={`${analytics.most_liked.likes.toLocaleString()} likes`}
          subtext={analytics.most_liked.date}
        />
        <Metric
          label="Zero Likes"
          value={analytics.zero_likes_count}
          subtext="posts"
        />
        <Metric
          label="Avg. per Month"
          value={analytics.avg_posts_per_month}
          subtext="posts"
        />
        <Metric
          label="Most Recent"
          value={analytics.most_recent_post.formatted}
          subtext={analytics.most_recent_post.relative}
        />
        <Metric
          label="Most Active"
          value={analytics.most_active_month.month}
          subtext={`${analytics.most_active_month.count} posts`}
        />
        <Metric
          label="Privacy: Public"
          value={`${analytics.privacy_dist.public_pct}%`}
          subtext={`${analytics.privacy_dist.public_count} posts`}
        />
        <Metric
          label="Privacy: Friends"
          value={`${analytics.privacy_dist.friends_pct}%`}
          subtext={`${analytics.privacy_dist.friends_count} posts`}
        />
        <Metric
          label="Privacy: Private"
          value={`${analytics.privacy_dist.private_pct}%`}
          subtext={`${analytics.privacy_dist.private_count} posts`}
        />
        <Metric
          label="Comments Enabled"
          value={`${analytics.comments_enabled_pct}%`}
        />
        <Metric
          label="Duets Enabled"
          value={`${analytics.duets_enabled_pct}%`}
        />
        <Metric
          label="Stitches Enabled"
          value={`${analytics.stitches_enabled_pct}%`}
        />
      </div>
    </div>
  );
}

function calculate_total_likes(posts: Post_Item[]) {
  return posts.reduce((sum, post) => {
    const likes = parseInt(post.Likes, 10) || 0;
    return sum + likes;
  }, 0);
}

function get_most_liked_post(posts: Post_Item[]) {
  if (posts.length === 0) {
    return { likes: 0, date: "N/A" };
  }

  const most_liked = posts.reduce((max, post) => {
    const likes = parseInt(post.Likes, 10) || 0;
    const max_likes = parseInt(max.Likes, 10) || 0;
    return likes > max_likes ? post : max;
  });

  const likes = parseInt(most_liked.Likes, 10) || 0;
  const date = new Date(most_liked.Date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return { likes, date };
}

function calculate_privacy_distribution(posts: Post_Item[]) {
  const total = posts.length;
  if (total === 0) {
    return {
      public_count: 0,
      public_pct: 0,
      friends_count: 0,
      friends_pct: 0,
      private_count: 0,
      private_pct: 0,
    };
  }

  const public_count = posts.filter((p) => p.WhoCanView.toLowerCase() === "public").length;
  const friends_count = posts.filter((p) => p.WhoCanView.toLowerCase().includes("friend")).length;
  const private_count = posts.filter((p) => p.WhoCanView.toLowerCase().includes("private")).length;

  return {
    public_count,
    public_pct: Math.round((public_count / total) * 100),
    friends_count,
    friends_pct: Math.round((friends_count / total) * 100),
    private_count,
    private_pct: Math.round((private_count / total) * 100),
  };
}

function calculate_engagement_percentage(posts: Post_Item[], field: "AllowComments" | "AllowDuets" | "AllowStitches") {
  if (posts.length === 0) return 0;

  const enabled_count = posts.filter((post) => {
    const value = post[field];
    return value.toLowerCase() === "yes" || value === "1";
  }).length;

  return Math.round((enabled_count / posts.length) * 100);
}

function group_posts_by_month(posts: Post_Item[]) {
  const posts_by_month = new Map<string, number>();

  posts.forEach((post) => {
    const date = new Date(post.Date);
    const month_key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    posts_by_month.set(month_key, (posts_by_month.get(month_key) || 0) + 1);
  });

  return posts_by_month;
}

function get_most_recent_post(posts: Post_Item[]) {
  if (posts.length === 0) {
    return { formatted: "N/A", relative: "" };
  }

  const most_recent = posts.reduce((latest, post) => {
    const post_date = new Date(post.Date);
    const latest_date = new Date(latest.Date);
    return post_date > latest_date ? post : latest;
  });

  const date = new Date(most_recent.Date);
  const formatted = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const now = new Date();
  const days_ago = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  const relative = days_ago === 0 ? "today" : days_ago === 1 ? "yesterday" : `${days_ago} days ago`;

  return { formatted, relative };
}

function get_most_active_month(posts_by_month: Map<string, number>) {
  if (posts_by_month.size === 0) {
    return { month: "N/A", count: 0 };
  }

  let most_active = { month: "", count: 0 };

  posts_by_month.forEach((count, month_key) => {
    if (count > most_active.count) {
      most_active = { month: month_key, count };
    }
  });

  const [year, month] = most_active.month.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  const formatted_month = date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return { month: formatted_month, count: most_active.count };
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
