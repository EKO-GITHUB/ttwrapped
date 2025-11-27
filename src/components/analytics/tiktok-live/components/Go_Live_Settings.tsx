"use client";

import { Check, Settings, X } from "lucide-react";

type Live_Settings_Props = {
  go_live_settings: {
    SettingsMap: {
      "Allow agencies to find and invite you": string;
      "Allow others to invite you to co-host in LIVE": string;
      "Allow people to send and receive comments during your LIVE": string;
      "Allow suggested LIVE hosts to invite you to co-host in LIVE": string;
      "Allow viewers to request to go LIVE with you": string;
      "Allow viewers to see and send questions and answers in your LIVE": string;
      "Allow viewers to send you gifts during your LIVE": string;
      "Hide comments that contain the following keywords from your LIVE": string[];
      "Hide potential spam or offensive comments from your LIVE": string;
      "People you assigned to moderate your LIVE": null;
      "Show your username and gift information in features with ranking lists": string;
    };
  };
  watch_live_settings: {
    WatchLiveSettingsMap: {
      app: string;
      web: string;
    };
    MostRecentModificationTimeInApp: string;
    MostRecentModificationTimeInWeb: string;
  };
};

export default function Go_Live_Settings({ go_live_settings, watch_live_settings }: Live_Settings_Props) {
  const go_live_settings_map = go_live_settings.SettingsMap;
  const hidden_keywords = go_live_settings_map["Hide comments that contain the following keywords from your LIVE"];

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="grid grid-cols-1 gap-4">
        <h3 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100">
          <Settings className="h-4 w-4" /> Go Live Settings
        </h3>

        <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <Setting_Row
              label="Allow agencies to find and invite you"
              value={go_live_settings_map["Allow agencies to find and invite you"]}
            />
            <Setting_Row
              label="Allow others to invite you to co-host in LIVE"
              value={go_live_settings_map["Allow others to invite you to co-host in LIVE"]}
            />
            <Setting_Row
              label="Allow people to send and receive comments during your LIVE"
              value={go_live_settings_map["Allow people to send and receive comments during your LIVE"]}
            />
            <Setting_Row
              label="Allow suggested LIVE hosts to invite you to co-host in LIVE"
              value={go_live_settings_map["Allow suggested LIVE hosts to invite you to co-host in LIVE"]}
            />
            <Setting_Row
              label="Allow viewers to request to go LIVE with you"
              value={go_live_settings_map["Allow viewers to request to go LIVE with you"]}
            />
            <Setting_Row
              label="Allow viewers to see and send questions and answers in your LIVE"
              value={go_live_settings_map["Allow viewers to see and send questions and answers in your LIVE"]}
            />
            <Setting_Row
              label="Allow viewers to send you gifts during your LIVE"
              value={go_live_settings_map["Allow viewers to send you gifts during your LIVE"]}
            />
            <Setting_Row
              label="Hide potential spam or offensive comments from your LIVE"
              value={go_live_settings_map["Hide potential spam or offensive comments from your LIVE"]}
            />
            <Setting_Row
              label="Show your username and gift information in features with ranking lists"
              value={go_live_settings_map["Show your username and gift information in features with ranking lists"]}
            />
          </div>
        </div>

        {hidden_keywords && hidden_keywords.length > 0 && (
          <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
            <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Hidden Keywords ({hidden_keywords.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {hidden_keywords.map((keyword, idx) => (
                <span
                  key={idx}
                  className="inline-block rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-300"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        <h3 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100">
          <Settings className="h-4 w-4" /> Watch Live Settings
        </h3>

        <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <Setting_Row
              label="App"
              value={watch_live_settings.WatchLiveSettingsMap.app}
            />
            <Setting_Row
              label="Web"
              value={watch_live_settings.WatchLiveSettingsMap.web}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function format_date(date_string: string) {
  if (!date_string) return "Never";
  const date = new Date(date_string);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Setting_Row({ label, value }: { label: string; value: string }) {
  const is_enabled = value.toLowerCase() === "on" || value.toLowerCase() === "yes" || value.toLowerCase() === "true";
  const is_disabled = value.toLowerCase() === "off" || value.toLowerCase() === "no" || value.toLowerCase() === "false";

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
      <div className="flex items-center gap-2">
        {is_enabled && (
          <>
            <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400">Enabled</span>
          </>
        )}
        {is_disabled && (
          <>
            <X className="h-4 w-4 text-red-600 dark:text-red-400" />
            <span className="text-sm font-medium text-red-600 dark:text-red-400">Disabled</span>
          </>
        )}
        {!is_enabled && !is_disabled && (
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{value}</span>
        )}
      </div>
    </div>
  );
}
