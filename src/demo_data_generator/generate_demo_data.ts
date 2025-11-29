import { TikTok_Data } from "@/types/TikTok_Data_Schema";
import { generate_ads_and_data } from "@/demo_data_generator/generate_ads_and_data";
import { generate_app_settings } from "@/demo_data_generator/generate_app_settings";
import { generate_comment } from "@/demo_data_generator/generate_comment";
import { generate_profile } from "@/demo_data_generator/generate_profile";
import { generate_direct_message } from "@/demo_data_generator/generate_direct_message";
import {
  generate_income_plus_wallet_transactions
} from "@/demo_data_generator/generate_income_plus_wallet_transactions";
import { generate_location_review } from "@/demo_data_generator/generate_location_review";
import { generate_post } from "@/demo_data_generator/generate_post";
import { generate_tiktok_shop } from "@/demo_data_generator/generate_tiktok_shop";
import { generate_tiktok_live } from "@/demo_data_generator/generate_tiktok_live";
import { generate_your_activity } from "@/demo_data_generator/generate_your_activity";

export function generate_demo_data(){
  const ads_and_data = generate_ads_and_data();
  const app_settings = generate_app_settings();
  const comment = generate_comment();
  const profile = generate_profile();
  const direct_message = generate_direct_message(profile["Profile Info"].ProfileMap.userName);
  const income_plus_wallet_transactions = generate_income_plus_wallet_transactions();
  const location_review = generate_location_review();
  const post = generate_post();
  const tiktok_shop = generate_tiktok_shop();
  const tiktok_live = generate_tiktok_live();
  const your_activity = generate_your_activity();

  const tiktok_data: TikTok_Data = {
    "Ads and data": ads_and_data,
    "App Settings": app_settings,
    Comment: comment,
    Profile: profile,
    "Direct Message": direct_message,
    "Income Plus Wallet Transactions": income_plus_wallet_transactions,
    "Location Review": location_review,
    Post: post,
    "TikTok Shop": tiktok_shop,
    "Tiktok Live": tiktok_live,
    "Your Activity": your_activity,
  };

  return tiktok_data;
}