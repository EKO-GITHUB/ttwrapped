"use client";

import { Settings as SettingsIcon } from "lucide-react";
import { useData_store } from "@/stores/useData_store";
import Setting_Group from "./Setting_Group";
import Setting_Item from "./Setting_Item";

export default function Other_Settings() {
  const app_settings = useData_store((state) => state.app_settings)!;
  const settings = app_settings.Settings.SettingsMap;

  const other_settings = [
    { label: "Personalized Ads", value: settings["Personalized Ads"] },
    { label: "App Language", value: settings["App Language"] },
    { label: "Web Language", value: settings["Web Language"] },
  ];

  return (
    <Setting_Group
      title="Other Settings"
      icon={<SettingsIcon className="h-4 w-4" />}
    >
      {other_settings.map((setting, index) => (
        <Setting_Item
          key={index}
          label={setting.label}
          value={setting.value}
        />
      ))}
    </Setting_Group>
  );
}
