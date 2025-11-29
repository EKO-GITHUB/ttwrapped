import { faker } from "@faker-js/faker/locale/en";
import { format_timestamp } from "./format_timestamp";
import { TikTok_Data } from "@/types/TikTok_Data_Schema";

export function generate_app_settings() {
  const app_settings: TikTok_Data["App Settings"] = {
    "Block List": {
      App: 1,
      BlockList: Array.from({ length: 10 }, () => ({
        Date: format_timestamp(faker.date.past()),
        UserName: faker.internet.username(),
      })),
    },
    Settings: {
      App: 1,
      SettingsMap: {
        "Allow DownLoad": "Off",
        "Allow Others to Find Me": "Disabled",
        "Allow Reuse of Content": "Only Me",
        "App Language": "English",
        "Content Preferences": {
          "Keyword filters for videos in Following feed": Array.from({ length: 4 }, () => faker.lorem.word()),
          "Keyword filters for videos in For You feed": Array.from({ length: 6 }, () => faker.lorem.word()),
          "Video Languages Preferences": [],
        },
        "Family Content Preferences": {},
        "Filter Comments": "Disabled",
        Interests: "",
        "Personalized Ads": "Enabled",
        "Private Account": "Disabled",
        "Push Notification": {
          "Desktop notification": "Default",
          "New Comments on My Video": "Default",
          "New Fans": "Default",
          "New Likes on My Video": "Default",
        },
        "Suggest your account to Facebook friends": "disabled",
        "Suggest your account to contacts": "disabled",
        "Suggest your account to people who open or send links to you": "enabled",
        "Web Language": "N/A",
        "Who Can Duet With Me": "Off",
        "Who Can Post Comments": "Everyone",
        "Who Can Send Me Message": "Everyone",
        "Who Can Stitch with your videos": "Off",
        "Who Can View Videos I Liked": "Everyone",
      },
    },
    UserThirdPlatformInformation: {},
  };

  return app_settings;
}
