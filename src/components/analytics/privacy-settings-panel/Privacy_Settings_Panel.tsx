"use client";

import { Shield } from "lucide-react";
import Data_Section_Card from "@/components/layout/Data_Section_Card";
import Empty_State from "@/components/custom/Empty_State";
import { useData_store } from "@/stores/useData_store";
import Privacy_Settings from "./components/Privacy_Settings";
import Interaction_Settings from "./components/Interaction_Settings";
import Discoverability_Settings from "./components/Discoverability_Settings";
import Other_Settings from "./components/Other_Settings";
import Content_Filters from "./components/Content_Filters";

export default function Privacy_Settings_Panel() {
  const app_settings_is_valid = useData_store((state) => state.app_settings_is_valid);

  if (!app_settings_is_valid) {
    return (
      <Data_Section_Card
        value="privacy-settings"
        title="Privacy Settings"
        icon={<Shield className="h-6 w-6" />}
        badge={0}
      >
        <Empty_State
          message="Privacy Settings Error"
          description="There is an issue with parsing the data in 'App Settings' in your user_data_tiktok.json"
          highlighted_section={"App Settings"}
        />
      </Data_Section_Card>
    );
  }

  return (
    <Data_Section_Card
      value="privacy-settings"
      title="Privacy Settings"
      description="Your TikTok privacy and account settings"
      icon={<Shield className="h-6 w-6" />}
    >
      <div className="space-y-8">
        <Privacy_Settings />
        <Interaction_Settings />
        <Discoverability_Settings />
        <Other_Settings />
        <Content_Filters />
      </div>
    </Data_Section_Card>
  );
}
