import {
  Ads_And_Data_Schema,
  App_Settings_Schema,
  Comment_Schema,
  Direct_Message_Schema,
  Income_Plus_Wallet_Transactions_Schema,
  Location_Review_Schema,
  Post_Schema,
  Profile_Schema,
  TikTok_Data,
  Tiktok_Live_Schema,
  TikTok_Shop_Schema,
  Your_Activity_Schema,
} from "@/types/TikTok_Data_Schema";
import { z } from "zod";
import { Data_Section_Key } from "./types";

export type Section_Config = {
  key: Data_Section_Key;
  data_key: keyof TikTok_Data;
  schema: z.ZodTypeAny;
};

export const section_configs: Section_Config[] = [
  { key: "ads_and_data", data_key: "Ads and data", schema: Ads_And_Data_Schema },
  { key: "app_settings", data_key: "App Settings", schema: App_Settings_Schema },
  { key: "comment", data_key: "Comment", schema: Comment_Schema },
  { key: "direct_message", data_key: "Direct Message", schema: Direct_Message_Schema },
  {
    key: "income_plus_wallet_transactions",
    data_key: "Income Plus Wallet Transactions",
    schema: Income_Plus_Wallet_Transactions_Schema,
  },
  { key: "location_review", data_key: "Location Review", schema: Location_Review_Schema },
  { key: "post", data_key: "Post", schema: Post_Schema },
  { key: "profile", data_key: "Profile", schema: Profile_Schema },
  { key: "tiktok_shop", data_key: "TikTok Shop", schema: TikTok_Shop_Schema },
  { key: "tiktok_live", data_key: "Tiktok Live", schema: Tiktok_Live_Schema },
  { key: "your_activity", data_key: "Your Activity", schema: Your_Activity_Schema },
];
