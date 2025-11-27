"use client";

import { User } from "lucide-react";
import Data_Section_Card from "@/components/layout/Data_Section_Card";
import Empty_State from "@/components/custom/Empty_State";
import { useData_store } from "@/stores/useData_store";
import Profile_Header from "./components/Profile_Header";
import Personal_Information from "./components/Personal_Information";
import Connected_Accounts from "./components/Connected_Accounts";
import Platform_Connections from "./components/Platform_Connections";
import AI_Profile from "./components/AI_Profile";

export default function Profile_Overview() {
  const profile_is_valid = useData_store((state) => state.profile_is_valid);

  if (!profile_is_valid) {
    return (
      <Data_Section_Card
        value="profile"
        title="Profile"
        icon={<User className="h-6 w-6" />}
        badge={0}
      >
        <Empty_State
          message="Profile Error"
          description="There is an issue with parsing the data in 'Profile' in your user_data_tiktok.json"
          highlighted_section={"Profile"}
        />
      </Data_Section_Card>
    );
  }

  return (
    <Data_Section_Card
      value="profile"
      title="Profile"
      description="Your TikTok profile information"
      icon={<User className="h-6 w-6" />}
    >
      <div className="space-y-8">
        <Profile_Header />
        <Personal_Information />
        <Connected_Accounts />
        <Platform_Connections />
        <AI_Profile />
      </div>
    </Data_Section_Card>
  );
}
