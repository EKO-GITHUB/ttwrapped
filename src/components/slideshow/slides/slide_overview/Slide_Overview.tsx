"use client";

import { format_number } from "@/components/slideshow/format_number";
import { get_profile_definition } from "@/components/slideshow/slides/slide_overview/get_profile_definition";
import { calculate_user_profile } from "@/stores/calculate_user_profile";
import { useData_store } from "@/stores/useData_store";
import { motion } from "framer-motion";
import { Clock, Heart, Layers, LucideIcon, MessageCircle, Play, Share2, UserPlus, Users } from "lucide-react";
import Image from "next/image";

export function Slide_Overview() {
  const stats = useData_store((state) => state.stats);
  const profile = useData_store((state) => state.profile);
  const post = useData_store((state) => state.post);
  const is_exporting = useData_store((state) => state.is_exporting);

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
      <motion.p
        className="mb-6 text-lg font-medium opacity-80"
        {...(!is_exporting && {
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 0.8, y: 0 },
          transition: { duration: 0.5, delay: 0.1 },
        })}
      >
        Your Year in Review
      </motion.p>

      <motion.div
        {...(!is_exporting && {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.5, delay: 0.3, type: "spring", bounce: 0.4 },
        })}
        className={"grid items-center justify-center justify-items-center"}
      >
        <img
          src={profile_photo}
          alt={username || "Profile"}
          className="mb-1 h-20 w-20 rounded-full border-4 border-white/50 object-cover"
        />
        <motion.p
          className="mb-2 text-xl font-semibold"
          {...(!is_exporting && {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.5, delay: 0.5 },
          })}
        >
          @{username}
        </motion.p>
      </motion.div>

      <motion.div
        className={
          "mb-4 flex items-center justify-center justify-items-center gap-2 rounded-md border-2 border-white/40 bg-black/60 p-2"
        }
        {...(!is_exporting && {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.7 },
        })}
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
        <p className="mb-1 text-xl font-bold">{profile_definition.profile_name}</p>
      </motion.div>
      <motion.p
        className="mb-4 max-w-md text-sm leading-relaxed opacity-80"
        {...(!is_exporting && {
          initial: { opacity: 0 },
          animate: { opacity: 0.8 },
          transition: { duration: 0.5, delay: 0.9 },
        })}
      >
        {profile_definition.profile_description}
      </motion.p>

      <motion.div
        className="mb-6 flex gap-2"
        {...(!is_exporting && {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 1.1 },
        })}
      >
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
      </motion.div>

      <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
        <Stat_Box
          icon={Clock}
          label="Hours"
          value={Math.round(hours_watched)}
          color="text-cyan-400"
          delay={1.5}
          is_exporting={is_exporting}
        />
        <Stat_Box
          icon={Play}
          label="Videos"
          value={videos_watched}
          color="text-pink-400"
          delay={1.6}
          is_exporting={is_exporting}
        />
        <Stat_Box
          icon={Layers}
          label="Sessions"
          value={sessions}
          color="text-purple-400"
          delay={1.7}
          is_exporting={is_exporting}
        />
        <Stat_Box
          icon={Heart}
          label="Likes"
          value={likes}
          color="text-red-400"
          delay={1.8}
          is_exporting={is_exporting}
        />
        <Stat_Box
          icon={Share2}
          label="Shares"
          value={shares}
          color="text-green-400"
          delay={1.9}
          is_exporting={is_exporting}
        />
        <Stat_Box
          icon={MessageCircle}
          label="Comments"
          value={comments}
          color="text-yellow-400"
          delay={2.0}
          is_exporting={is_exporting}
        />
        <Stat_Box
          icon={Users}
          label="Followers"
          value={followers}
          color="text-blue-400"
          delay={2.1}
          is_exporting={is_exporting}
        />
        <Stat_Box
          icon={UserPlus}
          label="Following"
          value={following}
          color="text-orange-400"
          delay={2.2}
          is_exporting={is_exporting}
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
  delay,
  is_exporting,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  color: string;
  delay: number;
  is_exporting: boolean;
}) {
  return (
    <motion.div
      className="flex w-full items-center justify-items-center gap-4 rounded-xl border border-white/30 bg-black/50 px-3 py-2 backdrop-blur-sm"
      {...(!is_exporting && {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.4, delay, type: "spring", bounce: 0.3 },
      })}
    >
      <div className={"mx-auto"}>
        <Icon className={`h-6 w-6 ${color}`} />
      </div>
      <div className="grid w-full justify-center justify-items-center gap-1">
        <span className="text-base leading-tight font-bold">{format_number(value)}</span>
        <span className="text-xs text-white/60">{label}</span>
      </div>
    </motion.div>
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
