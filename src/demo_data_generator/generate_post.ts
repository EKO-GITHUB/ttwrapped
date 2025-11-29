import { TikTok_Data } from "@/types/TikTok_Data_Schema";
import { faker } from "@faker-js/faker/locale/en";
import { format_timestamp } from "./format_timestamp";

export function generate_post() {
  const post: TikTok_Data["Post"] = {
    Posts: {
      VideoList: Array.from({ length: 5 }, () => ({
        Date: format_timestamp(faker.date.past()),
        Link: faker.internet.url(),
        Likes: String(faker.number.int({ min: 5, max: 2500 })),
        WhoCanView: "Everyone",
        AllowComments: "Yes",
        AllowStitches: "Yes",
        AllowDuets: "No",
        AllowStickers: "Yes",
        AllowSharingToStory: "Yes",
        ContentDisclosure: "",
        AIGeneratedContent: "",
        Sound: faker.lorem.text(),
        Location: "",
        Title: "N/A",
        AddYoursText: "N/A",
        AlternateText: "N/A",
        CoverImage: faker.internet.url(),
      })),
    },
    "Recently Deleted Posts": {
      PostList: [],
    },
  };

  return post;
}
