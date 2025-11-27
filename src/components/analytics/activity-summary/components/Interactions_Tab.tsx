"use client";

import { useState } from "react";
import Activity_Map from "@/components/custom/Activity_Map";
import DeferredRender from "@/components/custom/DeferredRender";
import Stat_Card from "./Stat_Card";
import { favorite_videos_columns, likes_columns, searches_columns } from "./table-columns";
import { Activity, Heart, MapPin, Search, Share2, Star } from "lucide-react";
import { Your_Activity } from "@/types/TikTok_Data_Schema";
import Activity_Table from "@/components/analytics/shared/Activity_Table";

export default function Interactions_Tab({ activity }: { activity: Your_Activity }) {
  const like_list = activity["Like List"].ItemFavoriteList;
  const share_history = activity["Share History"].ShareHistoryList;
  const favorite_videos = activity["Favorite Videos"].FavoriteVideoList;
  const search_history = activity.Searches.SearchList;
  const favorite_effects = activity["Favorite Effects"].FavoriteEffectsList;

  const [activeSubTab, setActiveSubTab] = useState<"favorites" | "likes" | "searches">("favorites");

  return (
    <DeferredRender>
      <div className="animate-in fade-in grid w-full min-w-0 grid-cols-1 gap-8 duration-300">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="grid grid-cols-1 gap-2">
            <h3 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100">
              <Heart className="h-4 w-4" /> Likes Activity ({like_list.length.toLocaleString() ?? "0"})
            </h3>
            <Activity_Map
              data={like_list}
              date_field="date"
              title="Likes Activity"
              singular_label="like"
              plural_label="likes"
              color="red"
            />
          </div>

          <div className="grid gap-2">
            <h3 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100">
              <Share2 className="h-4 w-4" /> Shares Activity ({share_history.length.toLocaleString() ?? "0"})
            </h3>
            <Activity_Map
              data={share_history}
              date_field="Date"
              title="Shares Activity"
              singular_label="share"
              plural_label="shares"
              color="green"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Stat_Card
            icon={<Heart className="h-5 w-5" />}
            label="Favorite Videos"
            value={favorite_videos.length.toLocaleString()}
            color="pink"
          />
          <Stat_Card
            icon={<Search className="h-5 w-5" />}
            label="Total Searches"
            value={search_history.length.toLocaleString()}
            color="orange"
          />
          <Stat_Card
            icon={<MapPin className="h-5 w-5" />}
            label="Favorite Effects"
            value={favorite_effects.length.toLocaleString()}
            color="indigo"
          />
          {activity["Favorite Collection"]?.FavoriteCollectionList?.length > 0 && (
            <Stat_Card
              icon={<Activity className="h-5 w-5" />}
              label="Favorite Collections"
              value={activity["Favorite Collection"].FavoriteCollectionList.length.toLocaleString()}
              color="purple"
            />
          )}
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2 dark:border-gray-800">
            <button
              onClick={() => setActiveSubTab("favorites")}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                activeSubTab === "favorites"
                  ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                  : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50"
              }`}
            >
              <Star className="h-4 w-4" />
              Favorite Videos
            </button>
            <button
              onClick={() => setActiveSubTab("likes")}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                activeSubTab === "likes"
                  ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                  : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50"
              }`}
            >
              <Heart className="h-4 w-4" />
              Liked Videos
            </button>
            <button
              onClick={() => setActiveSubTab("searches")}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                activeSubTab === "searches"
                  ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                  : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50"
              }`}
            >
              <Search className="h-4 w-4" />
              Searches
            </button>
          </div>

          {activeSubTab === "favorites" && (
            <Activity_Table
              data={favorite_videos}
              columns={favorite_videos_columns}
              title="Favorite Videos"
              icon={<Star className="h-5 w-5" />}
              searchable={true}
              defaultSorting={[{ id: "Date", desc: true }]}
            />
          )}

          {activeSubTab === "likes" && (
            <Activity_Table
              data={like_list}
              columns={likes_columns}
              title="Liked Videos"
              icon={<Heart className="h-5 w-5" />}
              searchable={true}
              defaultSorting={[{ id: "date", desc: true }]}
            />
          )}

          {activeSubTab === "searches" && (
            <Activity_Table
              data={search_history}
              columns={searches_columns}
              title="Search History"
              icon={<Search className="h-5 w-5" />}
              searchable={true}
              defaultSorting={[{ id: "Date", desc: true }]}
            />
          )}
        </div>
      </div>
    </DeferredRender>
  );
}
