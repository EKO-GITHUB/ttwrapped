import { TikTok_Data } from "@/types/TikTok_Data_Schema";
import { faker } from "@faker-js/faker/locale/en";
import { format_timestamp } from "./format_timestamp";

export function generate_direct_message(user_username: string) {
  const chat_history: TikTok_Data["Direct Message"]["Direct Messages"]["ChatHistory"] = {};

  const num_conversations = faker.number.int({ min: 3, max: 10 });

  for (let i = 0; i < num_conversations; i++) {
    const partner_username = faker.internet.username();
    const chat_key = `Chat History with ${partner_username}:`;

    const num_messages = faker.number.int({ min: 5, max: 1000 });
    const messages = [];

    for (let j = 0; j < num_messages; j++) {
      let content = faker.lorem.sentence();

      // 5% chance to add emojis
      if (faker.datatype.boolean({ probability: 0.05 })) {
        const emoji_count = faker.number.int({ min: 1, max: 1 });
        const emojis = Array.from({ length: emoji_count }, () => faker.internet.emoji()).join(" ");
        content = `${content} ${emojis}`;
      }

      messages.push({
        Date: format_timestamp(faker.date.past()),
        From: faker.helpers.arrayElement([partner_username, user_username]),
        Content: content,
      });
    }

    chat_history[chat_key] = messages;
  }

  const direct_message: TikTok_Data["Direct Message"] = {
    "Direct Messages": {
      ChatHistory: chat_history,
    },
  };

  return direct_message;
}
