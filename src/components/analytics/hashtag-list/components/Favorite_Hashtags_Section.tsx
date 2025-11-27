"use client";

import { Hash, Star } from "lucide-react";
import { useData_store } from "@/stores/useData_store";

export default function Favorite_Hashtags_Section() {
  const your_activity = useData_store((state) => state.your_activity)!;

  const favorite_hashtags = your_activity["Favorite Hashtags"].FavoriteHashtagList;
  const all_favorite_hashtags_as_string = favorite_hashtags.map((hashtag) => hashtag as string);

  if (all_favorite_hashtags_as_string.length === 0) return null;

  return (
    <div>
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        Favorite Hashtags
      </h3>
      <div className="flex flex-wrap gap-3">
        {all_favorite_hashtags_as_string.map((hashtag, index) => (
          <div
            key={`favorite-${index}`}
            className="flex items-center gap-2 rounded-lg border border-yellow-200 bg-yellow-50 p-3 transition-colors hover:bg-yellow-100 dark:border-yellow-800 dark:bg-yellow-900/20 dark:hover:bg-yellow-900/30"
          >
            <Hash className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            <span className="font-medium text-gray-900 dark:text-gray-100">{hashtag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
