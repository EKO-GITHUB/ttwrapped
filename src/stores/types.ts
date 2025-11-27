import {
  Ads_And_Data,
  App_Settings,
  Comment,
  Direct_Message,
  Income_Plus_Wallet_Transactions,
  Location_Review,
  Post,
  Profile,
  Tiktok_Live,
  TikTok_Shop,
  Your_Activity,
} from "@/types/TikTok_Data_Schema";
import { Watch_Stats } from "@/stores/calculate_watch_stats";
import React from "react";

export type View_State = "upload" | "slideshow" | "complete" | "dashboard";

export type Slide = {
  id: string;
  bg_image: string;
  content: React.ReactNode;
};

export type Data_Section_Key =
  | "ads_and_data"
  | "app_settings"
  | "comment"
  | "direct_message"
  | "income_plus_wallet_transactions"
  | "location_review"
  | "post"
  | "profile"
  | "tiktok_shop"
  | "tiktok_live"
  | "your_activity";

export type All_Stats = {
  watch: Watch_Stats;
  comment_count: number;
  like_count: number;
  favorite_count: number;
  share_count: number;
  search_count: number;
  follower_count: number;
  following_count: number;
};

export type App_State = {
  stats: All_Stats | null;
  slides: Slide[];
  ads_and_data: Ads_And_Data | null;
  ads_and_data_is_valid: boolean;
  app_settings: App_Settings | null;
  app_settings_is_valid: boolean;
  comment: Comment | null;
  comment_is_valid: boolean;
  direct_message: Direct_Message | null;
  direct_message_is_valid: boolean;
  income_plus_wallet_transactions: Income_Plus_Wallet_Transactions | null;
  income_plus_wallet_transactions_is_valid: boolean;
  location_review: Location_Review | null;
  location_review_is_valid: boolean;
  post: Post | null;
  post_is_valid: boolean;
  profile: Profile | null;
  profile_is_valid: boolean;
  tiktok_shop: TikTok_Shop | null;
  tiktok_shop_is_valid: boolean;
  tiktok_live: Tiktok_Live | null;
  tiktok_live_is_valid: boolean;
  your_activity: Your_Activity | null;
  your_activity_is_valid: boolean;
  error: string | null;
  view_state: View_State;
  is_loading: boolean;
  slideshow_backgrounds: string[];
  is_demo_mode: boolean;
};

export type App_Actions = {
  set_error: (error: string | null) => void;
  set_view_state: (state: View_State) => void;
  set_is_loading: (is_loading: boolean) => void;
  handle_file_load: (file: File | null) => Promise<void>;
  load_demo_data: () => Promise<void>;
  handle_error: (error: string) => void;
  go_to_slideshow: () => void;
  go_to_complete: () => void;
  go_to_dashboard: () => void;
  reset: () => void;
  get_is_all_valid: () => boolean;
  get_validation_summary: () => { valid_count: number; invalid_count: number; total: number };
};

export type UseData_store = App_State & App_Actions;
