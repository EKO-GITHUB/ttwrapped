import { TikTok_Data } from "@/types/TikTok_Data_Schema";
import { faker } from "@faker-js/faker/locale/en";
import { format_timestamp } from "./format_timestamp";
import { random_of_array } from "@/demo_data_generator/random_of_array";

export function generate_your_activity() {
  const your_activity: TikTok_Data["Your Activity"] = {
    "Activity Summary": {
      ActivitySummaryMap: {
        note: "data may have delays of up to several days",
        videosCommentedOnSinceAccountRegistration: faker.number.int({ min: 5, max: 2000 }),
        videosSharedSinceAccountRegistration: faker.number.int({ min: 5, max: 2000 }),
        videosWatchedToTheEndSinceAccountRegistration: faker.number.int({ min: 1000, max: 25000 }),
      },
    },
    Collection: {},
    Donation: {
      DonationList: null,
    },
    "Favorite Collection": {
      FavoriteCollectionList: Array.from({ length: 25 }, () => ({
        Date: format_timestamp(faker.date.past()),
        FavoriteCollection: faker.animal.cat(),
      })),
    },
    "Favorite Comment": {
      FavoriteCommentList: [],
    },
    "Favorite Effects": {
      FavoriteEffectsList: Array.from({ length: 3 }, () => ({
        Date: format_timestamp(faker.date.past()),
        EffectLink: faker.internet.url(),
      })),
    },
    "Favorite Hashtags": {
      FavoriteHashtagList: [],
    },
    "Favorite Location": {
      FavoriteLocationList: [],
    },
    "Favorite Sounds": {
      FavoriteSoundList: null,
    },
    "Favorite Videos": {
      App: 1,
      FavoriteVideoList: Array.from({ length: 100 }, () => ({
        Date: format_timestamp(faker.date.past()),
        Link: faker.internet.url(),
      })),
    },
    Follower: {
      App: 1,
      IsFastLane: false,
      FansList: Array.from({ length: 50 }, () => ({
        Date: format_timestamp(faker.date.past()),
        UserName: faker.internet.username(),
      })),
    },
    Following: {
      App: 1,
      IsFastLane: false,
      Following: Array.from({ length: 100 }, () => ({
        Date: format_timestamp(faker.date.past()),
        UserName: faker.internet.username(),
      })),
    },
    Fundraiser: {
      FundraiserList: null,
    },
    Hashtag: {
      HashtagList: Array.from({ length: 6 }, () => ({
        HashtagName: faker.lorem.word(),
        HashtagLink: faker.internet.url(),
      })),
    },
    "Like List": {
      App: 1,
      ItemFavoriteList: Array.from({ length: 150 }, () => ({
        date: format_timestamp(faker.date.past()),
        link: faker.internet.url(),
      })),
    },
    "Login History": {
      LoginHistoryList: Array.from({ length: 200 }, () => ({
        Date: format_timestamp(faker.date.past()),
        IP: faker.internet.ipv4(),
        DeviceModel: faker.lorem.word() + " " + faker.lorem.word(),
        DeviceSystem: faker.lorem.word() + " " + faker.number.int({ min: 10, max: 19 }),
        NetworkType: random_of_array(["Wi-Fi", "mobile"]),
        Carrier: faker.internet.domainName(),
      })),
    },
    "Most Recent Location Data": {
      LocationData: {
        Date: "N/A",
        GpsData: "N/A",
        LastRegion: "N/A",
      },
    },
    Purchases: {
      SendGifts: {
        SendGifts: null,
      },
      BuyGifts: {
        BuyGifts: null,
      },
    },
    Searches: {
      SearchList: Array.from({ length: 100 }, () => ({
        Date: format_timestamp(faker.date.past()),
        SearchTerm: faker.lorem.sentence(),
      })),
    },
    "Share History": {
      ShareHistoryList: Array.from({ length: 500 }, () => ({
        Date: format_timestamp(faker.date.past()),
        SharedContent: random_of_array(["chat_head", "chat", "chat_list", "sms", "more", "message"]),
        Link: faker.internet.url(),
        Method: random_of_array(["share_video", "share_profile", "share_live", "video"]),
      })),
    },
    Status: {
      "Status List": Array.from({ length: 100 }, () => ({
        Resolution: `${faker.number.int({ min: 1080, max: 4096 })}x${faker.number.int({ min: 1080, max: 4096 })}`,
        "App Version": `${faker.number.int({ min: 5, max: 50 })}.${faker.number.int({ min: 0, max: 99 })}.${faker.number.int({ min: 0, max: 99 })}`,
        IDFA: "",
        GAID: faker.string.uuid(),
        "Android ID": faker.string.ulid(),
        IDFV: "",
        UID: faker.number.int({ min: 500000000, max: 1200000000 }),
        DID: String(faker.number.int({ min: 500000000, max: 1200000000 })),
        "Web ID": "",
      })),
    },
    "Watch History": {
      VideoList: Array.from({ length: 50000 }, () => ({
        Date: format_timestamp(faker.date.past()),
        Link: faker.internet.url(),
      })),
    },
  };

  return your_activity;
}
