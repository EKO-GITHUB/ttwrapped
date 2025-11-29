import { TikTok_Data } from "@/types/TikTok_Data_Schema";
import { faker } from "@faker-js/faker/locale/en";
import { format_timestamp } from "./format_timestamp";

export function generate_tiktok_live() {
  const watch_live_map: TikTok_Data["Tiktok Live"]["Watch Live History"]["WatchLiveMap"] = {};

  // Generate 5-15 watch live entries
  const num_entries = faker.number.int({ min: 5, max: 15 });

  for (let i = 0; i < num_entries; i++) {
    const live_id = faker.string.numeric(19); // Generate a 19-digit ID like "7507487329101499182"
    const watch_time = faker.date.past();

    // Generate 0-10 comments for this live stream
    const num_comments = faker.number.int({ min: 0, max: 10 });
    const comments = [];

    for (let j = 0; j < num_comments; j++) {
      const comment_time = faker.date.recent({ days: 1, refDate: watch_time });
      comments.push({
        CommentTime: format_timestamp(comment_time),
        CommentContent: faker.lorem.sentence(),
        RawTime: Math.floor(comment_time.getTime() / 1000),
      });
    }

    watch_live_map[live_id] = {
      Comments: comments,
      Questions: null,
      WatchTime: format_timestamp(watch_time),
      Link: "",
    };
  }

  const tiktok_live: TikTok_Data["Tiktok Live"] = {
    "Go Live History": {
      GoLiveList: null,
    },
    "Go Live Settings": {
      SettingsMap: {
        "Allow agencies to find and invite you": "N/A",
        "Allow others to invite you to co-host in LIVE": "On",
        "Allow people to send and receive comments during your LIVE": "N/A",
        "Allow suggested LIVE hosts to invite you to co-host in LIVE": "On",
        "Allow viewers to request to go LIVE with you": "N/A",
        "Allow viewers to see and send questions and answers in your LIVE": "N/A",
        "Allow viewers to send you gifts during your LIVE": "N/A",
        "Hide comments that contain the following keywords from your LIVE": [],
        "Hide potential spam or offensive comments from your LIVE": "N/A",
        "People you assigned to moderate your LIVE": null,
        "Show your username and gift information in features with ranking lists": "On",
      },
    },
    "Watch Live Comment": {},
    "Watch Live History": {
      WatchLiveMap: watch_live_map,
    },
    "Watch Live Settings": {
      WatchLiveSettingsMap: {
        app: "720P",
        web: "N/A",
      },
      MostRecentModificationTimeInApp: "1763490725433",
      MostRecentModificationTimeInWeb: "0",
    },
  };

  return tiktok_live;
}
