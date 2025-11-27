"use client";

import { Activity, Heart, History, Users } from "lucide-react";
import Data_Section_Card from "@/components/layout/Data_Section_Card";
import React, { useMemo, useState } from "react";
import Overview_Tab from "./components/Overview_Tab";
import Watch_History_Tab from "./components/Watch_History_Tab";
import Interactions_Tab from "./components/Interactions_Tab";
import Social_Tab from "./components/Social_Tab";
import { useData_store } from "@/stores/useData_store";
import Empty_State from "@/components/custom/Empty_State";

export default function Activity_Summary() {
  const your_activity_is_valid = useData_store((state) => state.your_activity_is_valid);
  const your_activity = useData_store((state) => state.your_activity)!;

  const [activeTab, setActiveTab] = useState<"overview" | "watch" | "interactions" | "social">("overview");

  if (!your_activity_is_valid) {
    return (
      <Data_Section_Card
        value="shopping"
        title="TikTok Shop"
        icon={<Activity className="h-6 w-6" />}
        badge={0}
      >
        <Empty_State
          message="Your Activity Error"
          description="There is an issue with parsing the data in 'Your Activity' in your user_data_tiktok.json"
          highlighted_section={"Your Activity"}
        />
      </Data_Section_Card>
    );
  }

  const liked_and_favorited_links = useMemo(() => {
    const liked_links = new Set(your_activity["Like List"].ItemFavoriteList.map((item) => item.link));
    const favorited_links = new Set(your_activity["Favorite Videos"].FavoriteVideoList.map((item) => item.Link));
    return { liked_links, favorited_links };
  }, [your_activity]);

  return (
    <Data_Section_Card
      value="activity-summary"
      title="Activity Summary"
      description="Overview of your activity, watch history, and interactions"
      icon={<Activity className="h-6 w-6" />}
    >
      <div className="space-y-8">
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4 dark:border-gray-800">
          <TabButton
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
            icon={<Activity className="h-4 w-4" />}
            label="Overview"
          />
          <TabButton
            active={activeTab === "watch"}
            onClick={() => setActiveTab("watch")}
            icon={<History className="h-4 w-4" />}
            label="Watch History"
          />
          <TabButton
            active={activeTab === "interactions"}
            onClick={() => setActiveTab("interactions")}
            icon={<Heart className="h-4 w-4" />}
            label="Interactions"
          />
          <TabButton
            active={activeTab === "social"}
            onClick={() => setActiveTab("social")}
            icon={<Users className="h-4 w-4" />}
            label="Social"
          />
        </div>

        {activeTab === "overview" && <Overview_Tab activity={your_activity} />}
        {activeTab === "watch" && (
          <Watch_History_Tab
            watch_history={your_activity["Watch History"].VideoList}
            liked_links={liked_and_favorited_links.liked_links}
            favorited_links={liked_and_favorited_links.favorited_links}
          />
        )}
        {activeTab === "interactions" && <Interactions_Tab activity={your_activity} />}
        {activeTab === "social" && <Social_Tab activity={your_activity} />}
      </div>
    </Data_Section_Card>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
        active
          ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
          : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
