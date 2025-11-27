"use client";

import { Heart, Users } from "lucide-react";
import Image from "next/image";
import { useData_store } from "@/stores/useData_store";
import Stat_Card from "./Stat_Card";

export default function Profile_Header() {
  const profile = useData_store((state) => state.profile)!;
  const profile_photo = profile["Profile Info"].ProfileMap.profilePhoto;
  const display_name = profile["Profile Info"].ProfileMap.displayName;
  const username = profile["Profile Info"].ProfileMap.userName;
  const biodescription = profile["Profile Info"].ProfileMap.bioDescription;
  const follower_count = profile["Profile Info"].ProfileMap.followerCount;
  const following_count = profile["Profile Info"].ProfileMap.followingCount;
  const likes_received = profile["Profile Info"].ProfileMap.likesReceived;

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      {profile_photo && profile_photo !== "None" && (
        <div className="flex-shrink-0">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-gray-200 dark:border-gray-700">
            <Image
              src={profile_photo}
              alt={display_name}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      <div className="flex-1 space-y-3">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{display_name}</h3>
          <p className="text-lg text-gray-600 dark:text-gray-400">@{username}</p>
        </div>

        {biodescription && biodescription !== "None" && (
          <p className="text-sm text-gray-700 dark:text-gray-300">{biodescription}</p>
        )}

        <div className="grid grid-cols-3 gap-3">
          <Stat_Card
            icon={<Users className="h-5 w-5" />}
            label="Followers"
            value={follower_count.toLocaleString()}
          />
          <Stat_Card
            icon={<Users className="h-5 w-5" />}
            label="Following"
            value={following_count}
          />
          <Stat_Card
            icon={<Heart className="h-5 w-5" />}
            label="Likes"
            value={likes_received}
          />
        </div>
      </div>
    </div>
  );
}
