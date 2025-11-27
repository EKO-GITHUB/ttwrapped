import { History, Info, Play, Share2 } from "lucide-react";
import Stat_Card from "./Stat_Card";
import { Your_Activity } from "@/types/TikTok_Data_Schema";
import { Tooltip, Tooltip_Content, Tooltip_Provider, Tooltip_Trigger } from "@/components/ui/tooltip";

export default function Overview_Tab({ activity }: { activity: Your_Activity }) {
  const summary = activity["Activity Summary"].ActivitySummaryMap;
  const watch_history = activity["Watch History"].VideoList;
  const like_list = activity["Like List"].ItemFavoriteList;
  const share_history = activity["Share History"].ShareHistoryList;
  const search_history = activity.Searches.SearchList;

  return (
    <div className="animate-in fade-in space-y-8 duration-300">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="relative">
          <Stat_Card
            icon={<Play className="h-5 w-5" />}
            label="Videos Watched"
            value={summary.videosWatchedToTheEndSinceAccountRegistration.toLocaleString()}
            color="blue"
          />
          <div className="absolute top-4 right-4">
            <Tooltip_Provider>
              <Tooltip>
                <Tooltip_Trigger>
                  <Info className="h-4 w-4 text-gray-400 hover:text-blue-500" />
                </Tooltip_Trigger>
                <Tooltip_Content className="max-w-xs">
                  <p className="text-xs">
                    TikTok counts a view as soon as a video starts playing.
                    <a
                      href="https://support.tiktok.com/en/using-tiktok/growing-your-audience/analytics"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 text-blue-400 underline hover:text-blue-300"
                    >
                      Learn more
                    </a>
                  </p>
                </Tooltip_Content>
              </Tooltip>
            </Tooltip_Provider>
          </div>
        </div>

        <Stat_Card
          icon={<Share2 className="h-5 w-5" />}
          label="Videos Shared"
          value={summary.videosSharedSinceAccountRegistration.toLocaleString()}
          color="green"
        />
        <Stat_Card
          icon={<History className="h-5 w-5" />}
          label="Comments Posted"
          value={summary.videosCommentedOnSinceAccountRegistration.toLocaleString()}
          color="purple"
        />
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-800/50">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Quick Stats</h3>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <QuickStat
            label="Total Watched"
            value={watch_history.length}
          />
          <QuickStat
            label="Liked Videos"
            value={like_list.length}
          />
          <QuickStat
            label="Searches"
            value={search_history.length}
          />
          <QuickStat
            label="Shares"
            value={share_history.length}
          />
        </div>
      </div>
    </div>
  );
}

function QuickStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <div className="text-xl font-bold text-gray-900 dark:text-gray-100">{value.toLocaleString()}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
    </div>
  );
}
