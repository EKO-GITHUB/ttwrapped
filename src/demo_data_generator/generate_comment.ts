import { TikTok_Data } from "@/types/TikTok_Data_Schema";
import { format_timestamp } from "./format_timestamp";
import { faker } from "@faker-js/faker/locale/en";

export function generate_comment() {
  const comment: TikTok_Data["Comment"] = {
    Comments: {
      App: 1,
      CommentsList: Array.from({ length: 600 }, () => ({
        date: format_timestamp(faker.date.past()),
        comment: faker.lorem.sentence(),
        url: "",
        photo: "N/A",
      })),
    },
  };

  return comment;
}
