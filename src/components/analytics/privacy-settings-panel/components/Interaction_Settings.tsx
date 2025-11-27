"use client";

import { MessageCircle } from "lucide-react";
import { useData_store } from "@/stores/useData_store";
import Setting_Group from "./Setting_Group";
import Setting_Item from "./Setting_Item";

export default function Interaction_Settings() {
  const app_settings = useData_store((state) => state.app_settings)!;
  const settings = app_settings.Settings.SettingsMap;

  const interaction_settings = [
    { label: "Who Can Post Comments", value: settings["Who Can Post Comments"] },
    { label: "Who Can Send Me Message", value: settings["Who Can Send Me Message"] },
    { label: "Who Can Duet With Me", value: settings["Who Can Duet With Me"] },
    { label: "Who Can Stitch with your videos", value: settings["Who Can Stitch with your videos"] },
    { label: "Who Can View Videos I Liked", value: settings["Who Can View Videos I Liked"] },
    { label: "Filter Comments", value: settings["Filter Comments"] },
  ];

  return (
    <Setting_Group
      title="Interactions"
      icon={<MessageCircle className="h-4 w-4" />}
    >
      {interaction_settings.map((setting, index) => (
        <Setting_Item
          key={index}
          label={setting.label}
          value={setting.value}
        />
      ))}
    </Setting_Group>
  );
}
