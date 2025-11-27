import { PROFILES } from "@/stores/profiles";
import { Profile_Definition } from "@/stores/calculate_user_profile";

export function get_profile_definition(combination_key: string): Profile_Definition {
  const found = PROFILES.find((p) => p.combination_key === combination_key);
  if (found) return found;

  return {
    combination_key,
    profile_name: "Unique User",
    profile_image: "",
    profile_description:
      "Your TikTok habits are uniquely yours. A blend of watching, engaging, sharing, and creating that defies categorization.",
  };
}
