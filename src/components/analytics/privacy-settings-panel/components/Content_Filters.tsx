"use client";

import { Eye } from "lucide-react";
import { useData_store } from "@/stores/useData_store";
import Setting_Group from "./Setting_Group";

export default function Content_Filters() {
  const app_settings = useData_store((state) => state.app_settings)!;
  const settings = app_settings.Settings.SettingsMap;

  const following_feed_filters = settings["Content Preferences"]["Keyword filters for videos in Following feed"];
  const for_you_feed_filters = settings["Content Preferences"]["Keyword filters for videos in For You feed"];

  const has_filters = following_feed_filters.length > 0 || for_you_feed_filters.length > 0;

  if (!has_filters) return null;

  return (
    <>
      {following_feed_filters.length > 0 && (
        <Setting_Group
          title="Content Filters (Following Feed)"
          icon={<Eye className="h-4 w-4" />}
        >
          <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Filtered Keywords</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {following_feed_filters.map((keyword, index) => (
                <span
                  key={index}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </Setting_Group>
      )}

      {for_you_feed_filters.length > 0 && (
        <Setting_Group
          title="Content Filters (For You Feed)"
          icon={<Eye className="h-4 w-4" />}
        >
          <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Filtered Keywords</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {for_you_feed_filters.map((keyword, index) => (
                <span
                  key={index}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </Setting_Group>
      )}
    </>
  );
}
