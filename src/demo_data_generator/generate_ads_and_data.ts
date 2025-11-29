import { format_timestamp } from "./format_timestamp";
import { TikTok_Data } from "@/types/TikTok_Data_Schema";
import { faker } from "@faker-js/faker/locale/en";
import { random_of_array } from "@/demo_data_generator/random_of_array";

export function generate_ads_and_data() {
  const ads_and_data: TikTok_Data["Ads and data"] = {
    "Ad Interests": {
      AdInterestCategories: "",
    },
    "Instant Form Ads Responses": {
      ResponsesList: null,
    },
    "Off TikTok Activity": {
      OffTikTokActivityDataList: Array.from({ length: 100 }, () => ({
        TimeStamp: format_timestamp(faker.date.past()),
        Source: faker.company.name(),
        Event: random_of_array([
          "AddToCart",
          "LaunchApp",
          "InstallApp",
          "Search",
          "CompletePayment",
          "Purchase",
          "Core_Available_Product_Presented",
          "ViewContent",
          "ReturningCustomer",
          "CompleteRegistration",
          "Pageview",
        ]),
      })),
    },
  };

  return ads_and_data;
}
