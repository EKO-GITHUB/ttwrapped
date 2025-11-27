"use client";

import { Shield } from "lucide-react";
import { useData_store } from "@/stores/useData_store";
import Setting_Group from "./Setting_Group";
import Setting_Item from "./Setting_Item";

export default function Privacy_Settings() {
  const app_settings = useData_store((state) => state.app_settings)!;
  const settings = app_settings.Settings.SettingsMap;

  const privacy_settings = [
    { label: "Private Account", value: settings["Private Account"] },
    { label: "Allow Others to Find Me", value: settings["Allow Others to Find Me"] },
    { label: "Allow Downloads", value: settings["Allow DownLoad"] },
    { label: "Allow Reuse of Content", value: settings["Allow Reuse of Content"] },
  ];

  return (
    <Setting_Group
      title="Privacy"
      icon={<Shield className="h-4 w-4" />}
    >
      {privacy_settings.map((setting, index) => (
        <Setting_Item
          key={index}
          label={setting.label}
          value={setting.value}
        />
      ))}
    </Setting_Group>
  );
}
