"use client";

import { Users } from "lucide-react";
import { useData_store } from "@/stores/useData_store";
import Setting_Group from "./Setting_Group";
import Setting_Item from "./Setting_Item";

export default function Discoverability_Settings() {
  const app_settings = useData_store((state) => state.app_settings)!;
  const settings = app_settings.Settings.SettingsMap;

  const discovery_settings = [
    { label: "Suggest your account to Facebook friends", value: settings["Suggest your account to Facebook friends"] },
    { label: "Suggest your account to contacts", value: settings["Suggest your account to contacts"] },
    {
      label: "Suggest your account to people who open or send links to you",
      value: settings["Suggest your account to people who open or send links to you"],
    },
  ];

  return (
    <Setting_Group
      title="Discoverability"
      icon={<Users className="h-4 w-4" />}
    >
      {discovery_settings.map((setting, index) => (
        <Setting_Item
          key={index}
          label={setting.label}
          value={setting.value}
        />
      ))}
    </Setting_Group>
  );
}
