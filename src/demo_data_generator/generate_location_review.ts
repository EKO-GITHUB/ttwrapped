import { TikTok_Data } from "@/types/TikTok_Data_Schema";

export function generate_location_review() {
  const location_review: TikTok_Data["Location Review"] = {
    "Location Reviews": {
      ReviewsList: null,
    },
  };

  return location_review;
}
