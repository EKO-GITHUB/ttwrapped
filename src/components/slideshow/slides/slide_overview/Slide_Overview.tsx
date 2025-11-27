import { format_number } from "@/components/slideshow/format_number";
import { Clock, Heart, Layers, LucideIcon, MessageCircle, Play, Share2, UserPlus, Users } from "lucide-react";
import Image from "next/image";
import { useData_store } from "@/stores/useData_store";
import { calculate_user_profile } from "@/stores/calculate_user_profile";
import { get_profile_definition } from "@/components/slideshow/slides/slide_overview/get_profile_definition";

export function Slide_Overview() {
  const stats = useData_store((state) => state.stats);
  const profile = useData_store((state) => state.profile);
  const post = useData_store((state) => state.post);

  if (!stats || !profile) return null;

  const hours_watched = stats.watch.total_watch_time_hours;
  const videos_watched = stats.watch.total_videos;
  const sessions = stats.watch.session_count;
  const likes = stats.like_count;
  const shares = stats.share_count;
  const comments = stats.comment_count;
  const followers = stats.follower_count;
  const following = stats.following_count;

  const posts = post?.Posts?.VideoList?.length ?? 0;

  const profile_metrics = calculate_user_profile(
    hours_watched,
    videos_watched,
    likes,
    comments,
    stats.favorite_count,
    shares,
    posts,
  );
  const profile_definition = get_profile_definition(profile_metrics.combination_key);

  const profile_photo = profile["Profile Info"]?.ProfileMap?.profilePhoto;
  const username = profile["Profile Info"]?.ProfileMap?.userName;

  return (
    <>
      <p className="mb-6 text-lg font-medium opacity-80">Your Year in Review</p>

      <div>
        <img
          src={profile_photo}
          alt={username || "Profile"}
          className="mb-1 h-20 w-20 rounded-full border-4 border-white/50 object-cover"
        />
        <p className="mb-2 text-xl font-semibold">@{username}</p>
      </div>

      <div
        className={
          "flex items-center justify-center justify-items-center gap-2 rounded-md border-2 border-white/40 bg-black/60 p-2"
        }
      >
        <p className="mb-1">
          {profile_definition.profile_image && (
            <Image
              src={profile_definition.profile_image}
              alt="Profile Image"
              width={50}
              height={50}
            />
          )}
        </p>
        <p className="mb-1 text-2xl font-bold">{profile_definition.profile_name}</p>
      </div>
      <p className="mb-4 max-w-md text-sm leading-relaxed opacity-80">{profile_definition.profile_description}</p>

      <div className="mb-2 flex gap-2">
        <Dimension_Chip
          label="Consumption"
          level={profile_metrics.consumption}
        />
        <Dimension_Chip
          label="Engagement"
          level={profile_metrics.engagement}
        />
        <Dimension_Chip
          label="Sharing"
          level={profile_metrics.sharing}
        />
        <Dimension_Chip
          label="Creation"
          level={profile_metrics.creation}
        />
      </div>

      <div className={"my-2 w-full border border-t border-white/20 sm:my-4"}></div>

      <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
        <Stat_Box
          icon={Clock}
          label="Hours"
          value={Math.round(hours_watched)}
          color="text-cyan-400"
        />
        <Stat_Box
          icon={Play}
          label="Videos"
          value={videos_watched}
          color="text-pink-400"
        />
        <Stat_Box
          icon={Layers}
          label="Sessions"
          value={sessions}
          color="text-purple-400"
        />
        <Stat_Box
          icon={Heart}
          label="Likes"
          value={likes}
          color="text-red-400"
        />
        <Stat_Box
          icon={Share2}
          label="Shares"
          value={shares}
          color="text-green-400"
        />
        <Stat_Box
          icon={MessageCircle}
          label="Comments"
          value={comments}
          color="text-yellow-400"
        />
        <Stat_Box
          icon={Users}
          label="Followers"
          value={followers}
          color="text-blue-400"
        />
        <Stat_Box
          icon={UserPlus}
          label="Following"
          value={following}
          color="text-orange-400"
        />
      </div>
    </>
  );
}

function Stat_Box({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex w-full items-center justify-items-center gap-4 rounded-xl border border-white/30 bg-black/50 px-3 py-2 backdrop-blur-sm">
      <div className={"mx-auto"}>
        <Icon className={`h-6 w-6 ${color}`} />
      </div>
      <div className="grid w-full justify-center justify-items-center gap-1">
        <span className="text-base leading-tight font-bold">{format_number(value)}</span>
        <span className="text-xs text-white/60">{label}</span>
      </div>
    </div>
  );
}

function Dimension_Chip({ label, level }: { label: string; level: "low" | "medium" | "high" }) {
  const level_color = get_level_bg(level);
  return <div className={`rounded-full px-2 py-1 text-xs font-medium ${level_color}`}>{label}</div>;
}

function get_level_bg(level: "low" | "medium" | "high"): string {
  switch (level) {
    case "low":
      return "bg-black/20 border border-white/20";
    case "medium":
      return "bg-green-600/80";
    case "high":
      return "bg-blue-600/80";
  }
}
