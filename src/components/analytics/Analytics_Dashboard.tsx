"use client";

import { Accordion } from "@/components/ui/accordion";
import Activity_Summary from "@/components/analytics/activity-summary/Activity_Summary";
import Shopping from "@/components/analytics/shopping/Shopping";
import Login_History from "@/components/analytics/login-history/Login_History";
import Privacy_Settings_Panel from "@/components/analytics/privacy-settings-panel/Privacy_Settings_Panel";
import Ad_Tracking_Sections from "@/components/analytics/ad-tracking/Ad_Tracking_Sections";
import Hashtag_List from "@/components/analytics/hashtag-list/Hashtag_List";
import Profile_Overview from "@/components/analytics/profile-overview/Profile_Overview";
import Content_Timeline from "@/components/analytics/content-timeline/Content_Timeline";
import Comment_History from "@/components/analytics/comment-history/Comment_History";
import Block_List from "@/components/analytics/block-list/Block_List";
import TikTok_Live from "@/components/analytics/tiktok-live/TikTok_Live";
import Direct_Message from "@/components/analytics/direct-message/Direct_Message";

export default function Analytics_Dashboard() {
  return (
    <Accordion
      type="multiple"
      defaultValue={[]}
      className="space-y-6"
    >
      <Profile_Overview />
      <Activity_Summary />
      <Content_Timeline />
      <Comment_History />
      <Block_List />
      <TikTok_Live />
      <Direct_Message />
      <Shopping />
      <Login_History />
      <Privacy_Settings_Panel />
      <Ad_Tracking_Sections />
      <Hashtag_List />
    </Accordion>
  );
}
