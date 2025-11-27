"use client";

import { Video } from "lucide-react";
import Data_Section_Card from "@/components/layout/Data_Section_Card";
import Activity_Map from "@/components/custom/Activity_Map";
import { useData_store } from "@/stores/useData_store";
import Analytics_Section from "./components/Analytics_Section";
import Live_Streams_Table from "./components/Live_Streams_Table";
import Empty_TikTok_Live from "./components/Empty_TikTok_Live";
import Go_Live_Settings from "./components/Go_Live_Settings";

export default function TikTok_Live() {
  const tiktok_live_is_valid = useData_store((state) => state.tiktok_live_is_valid);
  const tiktok_live = useData_store((state) => state.tiktok_live)!;

  if (!tiktok_live_is_valid) {
    return <Empty_TikTok_Live />;
  }

  const live_streams = Object.entries(tiktok_live["Watch Live History"].WatchLiveMap)
    .map(([stream_id, stream_data]) => ({
      ...stream_data,
      stream_id,
      Comments: stream_data.Comments || [],
    }))
    .sort((a, b) => new Date(b.WatchTime).getTime() - new Date(a.WatchTime).getTime());

  if (live_streams.length === 0) return <No_Live_Streams />;

  return (
    <Data_Section_Card
      value="tiktok-live"
      title="TikTok LIVE"
      description="Your TikTok LIVE stream viewing history and comment activity"
      icon={<Video className="h-6 w-6" />}
      badge={live_streams.length}
    >
      <div className="grid w-full min-w-0 grid-cols-1 gap-4">
        <Analytics_Section live_streams={live_streams} />

        <Go_Live_Settings
          go_live_settings={tiktok_live["Go Live Settings"]}
          watch_live_settings={tiktok_live["Watch Live Settings"]}
        />

        <h3 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100">
          <Video className="h-4 w-4" /> Viewing Activity
        </h3>

        <Activity_Map
          data={live_streams}
          date_field="WatchTime"
          title="Live Viewing Activity"
          singular_label="stream"
          plural_label="streams"
          color="purple"
        />

        <Live_Streams_Table live_streams={live_streams} />
      </div>
    </Data_Section_Card>
  );
}

function No_Live_Streams() {
  return (
    <Data_Section_Card
      value="live-watch-history"
      title="Live Watch History"
      description="Your TikTok LIVE stream viewing history and comment activity"
      icon={<Video className="h-6 w-6" />}
    >
      <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-8 text-center dark:border-gray-700 dark:bg-gray-800/50">
        <Video className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">No live streams watched</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          You haven't watched any LIVE streams, or they were not included in your TikTok data export.
        </p>
      </div>
    </Data_Section_Card>
  );
}
