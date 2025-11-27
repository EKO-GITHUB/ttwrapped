"use client";

import { Hash } from "lucide-react";
import Data_Section_Card from "@/components/layout/Data_Section_Card";
import Empty_State from "@/components/custom/Empty_State";
import { useData_store } from "@/stores/useData_store";
import Favorite_Hashtags_Section from "./components/Favorite_Hashtags_Section";
import Regular_Hashtags_Section from "./components/Regular_Hashtags_Section";

export default function Hashtag_List() {
  const your_activity_is_valid = useData_store((state) => state.your_activity_is_valid);

  if (!your_activity_is_valid) {
    return (
      <Data_Section_Card
        value="hashtags"
        title="Hashtags"
        icon={<Hash className="h-6 w-6" />}
        badge={0}
      >
        <Empty_State
          message="Your Activity Error"
          description="There is an issue with parsing the data in 'Your Activity' in your user_data_tiktok.json"
          highlighted_section={"Your Activity"}
        />
      </Data_Section_Card>
    );
  }

  return (
    <Data_Section_Card
      value="hashtags"
      title="Hashtags"
      description="Hashtags you've interacted with on TikTok"
      icon={<Hash className="h-6 w-6" />}
    >
      <div className="space-y-6">
        <Favorite_Hashtags_Section />
        <Regular_Hashtags_Section />
      </div>
    </Data_Section_Card>
  );
}
