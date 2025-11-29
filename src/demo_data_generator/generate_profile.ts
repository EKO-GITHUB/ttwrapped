import { TikTok_Data } from "@/types/TikTok_Data_Schema";
import { faker } from "@faker-js/faker/locale/en";

export function generate_profile() {
  const profile: TikTok_Data["Profile"] = {
    "AI-Moji": {
      CreateDate: "",
      AIMojiList: null,
    },
    AISelfImage: {},
    Autofill: {
      PhoneNumber: "N/A",
      Email: "N/A",
      FirstName: "N/A",
      LastName: "N/A",
      Address: "N/A",
      ZipCode: "N/A",
      Unit: "N/A",
      City: "N/A",
      State: "N/A",
      Country: "N/A",
    },
    "Profile Info": {
      App: 1,
      ProfileMap: {
        PlatformInfo: [
          {
            Description: "",
            Name: faker.internet.displayName(),
            Platform: "Google",
            "Profile Photo": "",
          },
        ],
        aiSelf: "/demo/demo-pfp.png",
        bioDescription: faker.lorem.sentence(),
        birthDate: format_birthdate(faker.date.birthdate()),
        displayName: faker.internet.displayName(),
        emailAddress: faker.internet.email(),
        followerCount: faker.number.int({ min: 5, max: 2500 }),
        followingCount: faker.number.int({ min: 5, max: 2500 }),
        inferredGender: "None",
        instagramLink: "",
        lemon8Link: "",
        likesReceived: String(faker.number.int({ min: 5, max: 2500 })),
        profilePhoto: "/demo/demo-pfp.png",
        profileVideo: "None",
        telephoneNumber: "None",
        userName: faker.internet.username(),
        youtubeLink: "",
      },
    },
  };

  return profile;
}

function format_birthdate(date: Date): string {
  const month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const day = String(date.getDate()).padStart(2, "0");
  const month = month_names[date.getMonth()];
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
