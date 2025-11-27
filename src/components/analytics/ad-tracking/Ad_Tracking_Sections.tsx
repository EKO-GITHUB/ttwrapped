"use client";

import React, { useMemo, useState } from "react";
import { Activity, FileQuestion, Filter, Target, X } from "lucide-react";
import Data_Section_Card from "@/components/layout/Data_Section_Card";
import Empty_State from "@/components/custom/Empty_State";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Off_TikTok_Activity_DataList } from "@/types/TikTok_Data_Schema";
import Activity_Table from "./components/Activity_Table";
import Ad_Interests_Section from "./components/Ad_Interests_Section";
import { useData_store } from "@/stores/useData_store";

export default function Ad_Tracking_Sections() {
  const ads_and_data_is_valid = useData_store((state) => state.ads_and_data_is_valid);
  const ads_and_data = useData_store((state) => state.ads_and_data)!;

  if (!ads_and_data_is_valid)
    return (
      <Data_Section_Card
        value="ad-tracking"
        title="Ads & Tracking"
        icon={<Target className="h-6 w-6" />}
      >
        <Empty_State
          message="Ads And Data Error"
          description="There is an issue with parsing the data in 'Ads And Data' in your user_data_tiktok.json"
          highlighted_section={"Ads and data"}
        />
      </Data_Section_Card>
    );

  const has_data =
    ads_and_data["Ad Interests"].AdInterestCategories ||
    ads_and_data["Off TikTok Activity"].OffTikTokActivityDataList?.length > 0;

  if (!has_data) return <No_Data />;

  return (
    <Data_Section_Card
      value="ad-tracking"
      title="Ads & Tracking"
      description="Ad interests and off-TikTok activity tracking"
      icon={<Target className="h-6 w-6" />}
    >
      <div className="grid max-w-full min-w-0 grid-cols-1 gap-4">
        <Ad_Interests_Section ad_interests={ads_and_data["Ad Interests"]} />
        <Activity_Section activities={ads_and_data["Off TikTok Activity"].OffTikTokActivityDataList} />
      </div>
    </Data_Section_Card>
  );
}

function Activity_Section({ activities }: { activities: Off_TikTok_Activity_DataList[] }) {
  const [selected_event, set_selected_event] = useState<string>("all");
  const [selected_source, set_selected_source] = useState<string>("all");

  const available_events = useMemo(() => {
    const filtered_activities =
      selected_source === "all" ? activities : activities.filter((activity) => activity.Source === selected_source);

    const events = new Set(filtered_activities.map((activity) => activity.Event));
    return Array.from(events).sort();
  }, [activities, selected_source]);

  const available_sources = useMemo(() => {
    const filtered_activities =
      selected_event === "all" ? activities : activities.filter((activity) => activity.Event === selected_event);

    const sources = new Set(filtered_activities.map((activity) => activity.Source));
    return Array.from(sources).sort();
  }, [activities, selected_event]);

  const filtered_activities = useMemo(() => {
    let filtered = activities;

    if (selected_event !== "all") {
      filtered = filtered.filter((activity) => activity.Event === selected_event);
    }

    if (selected_source !== "all") {
      filtered = filtered.filter((activity) => activity.Source === selected_source);
    }

    return filtered;
  }, [activities, selected_event, selected_source]);

  const has_active_filters = selected_event !== "all" || selected_source !== "all";

  const clear_all_filters = () => {
    set_selected_event("all");
    set_selected_source("all");
  };

  return (
    <div className="space-y-4">
      <Activity_Section_Header
        filtered_count={filtered_activities.length}
        total_count={activities.length}
      />

      <Filter_Bar
        selected_event={selected_event}
        selected_source={selected_source}
        available_events={available_events}
        available_sources={available_sources}
        on_event_change={set_selected_event}
        on_source_change={set_selected_source}
        on_clear_filters={clear_all_filters}
        has_active_filters={has_active_filters}
      />

      <Activity_Table activities={filtered_activities} />
    </div>
  );
}

function Activity_Section_Header({ filtered_count, total_count }: { filtered_count: number; total_count: number }) {
  return (
    <div className="flex items-center justify-between">
      <h4 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100">
        <Activity className="h-5 w-5" />
        Off-TikTok Activity
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          ({filtered_count} of {total_count})
        </span>
      </h4>
    </div>
  );
}

function Filter_Bar({
  selected_event,
  selected_source,
  available_events,
  available_sources,
  on_event_change,
  on_source_change,
  on_clear_filters,
  has_active_filters,
}: {
  selected_event: string;
  selected_source: string;
  available_events: string[];
  available_sources: string[];
  on_event_change: (value: string) => void;
  on_source_change: (value: string) => void;
  on_clear_filters: () => void;
  has_active_filters: boolean;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50/50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">Filters:</span>
        </div>

        <div className="flex flex-1 items-center gap-3">
          <Filter_Select
            id="event-filter"
            label="Event"
            value={selected_event}
            on_change={on_event_change}
            options={available_events}
            all_label="All Events"
          />

          <Filter_Select
            id="source-filter"
            label="Source"
            value={selected_source}
            on_change={on_source_change}
            options={available_sources}
            all_label="All Sources"
          />
        </div>

        {has_active_filters && (
          <button
            onClick={on_clear_filters}
            className="flex items-center gap-1.5 rounded-md bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            <X className="h-3.5 w-3.5" />
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}

function Filter_Select({
  id,
  label,
  value,
  on_change,
  options,
  all_label,
}: {
  id: string;
  label: string;
  value: string;
  on_change: (value: string) => void;
  options: string[];
  all_label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor={id}
        className="text-sm text-gray-600 dark:text-gray-400"
      >
        {label}
      </label>
      <Select
        value={value}
        onValueChange={on_change}
      >
        <SelectTrigger
          id={id}
          className="w-[180px]"
        >
          <SelectValue placeholder={all_label} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{all_label}</SelectItem>
          {options.map((option) => (
            <SelectItem
              key={option}
              value={option}
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function No_Data() {
  return (
    <Data_Section_Card
      value="ad-tracking"
      title="Ads & Tracking"
      icon={<Target className="h-6 w-6" />}
    >
      <div
        className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center dark:border-gray-700 dark:bg-gray-900/50`}
      >
        <div className="mb-4 text-gray-400 dark:text-gray-600">
          <FileQuestion className="h-12 w-12" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">{"No Data"}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{"There is no Ad Tracking data"}</p>
      </div>
    </Data_Section_Card>
  );
}
