"use client";

import { Hash } from "lucide-react";
import Link_Button from "@/components/custom/Link_Button";
import { useData_store } from "@/stores/useData_store";

export default function Regular_Hashtags_Section() {
  const your_activity = useData_store((state) => state.your_activity)!;

  const hashtags = your_activity.Hashtag.HashtagList;
  const has_favorite_hashtags = your_activity["Favorite Hashtags"].FavoriteHashtagList.length > 0;

  if (hashtags.length === 0) return null;

  return (
    <div>
      {has_favorite_hashtags && (
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">All Hashtags</h3>
      )}
      <div className="flex flex-wrap gap-3">
        {hashtags.map((hashtag, index) => (
          <div
            key={`regular-${index}`}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800/50"
          >
            <Hash className="h-4 w-4 text-gray-500" />
            <span className="font-medium text-gray-900 dark:text-gray-100">{hashtag.HashtagName}</span>
            <Link_Button
              href={hashtag.HashtagLink}
              show_icon={false}
            >
              View
            </Link_Button>
          </div>
        ))}
      </div>
    </div>
  );
}
