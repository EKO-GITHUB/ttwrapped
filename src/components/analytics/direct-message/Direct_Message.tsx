"use client";

import { useMemo } from "react";
import { MessageCircle } from "lucide-react";
import Data_Section_Card from "@/components/layout/Data_Section_Card";
import Activity_Map from "@/components/custom/Activity_Map";
import { useData_store } from "@/stores/useData_store";
import Analytics_Section from "./components/Analytics_Section";
import Messages_Table from "./components/Messages_Table";
import Empty_Direct_Message from "./components/Empty_Direct_Message";
import { Flat_Message } from "./components/Messages_Table_Columns";
import { Direct_Message as Direct_Message_Type, Profile } from "@/types/TikTok_Data_Schema";

export default function Direct_Message() {
  const direct_message_is_valid = useData_store((state) => state.direct_message_is_valid);
  const direct_message = useData_store((state) => state.direct_message)!;
  const profile = useData_store((state) => state.profile)!;
  const profile_is_valid = useData_store((state) => state.profile_is_valid);

  if (!direct_message_is_valid || !profile_is_valid) {
    return <Empty_Direct_Message />;
  }

  const { messages, user_username } = useMemo(() => {
    const user = infer_user_username(direct_message, profile);
    const msgs = flatten_messages(direct_message["Direct Messages"].ChatHistory, user);
    const sorted_msgs = msgs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return { messages: sorted_msgs, user_username: user };
  }, [direct_message, profile]);

  if (messages.length === 0) return <No_Messages />;

  return (
    <Data_Section_Card
      value="direct-message"
      title="Direct Messages"
      description="Your TikTok direct messaging activity and conversation insights"
      icon={<MessageCircle className="h-6 w-6" />}
      badge={messages.length}
    >
      <div className="grid w-full min-w-0 grid-cols-1 gap-4">
        <Analytics_Section
          messages={messages}
          user_username={user_username}
        />

        <h3 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100">
          <MessageCircle className="h-4 w-4" /> Messaging Activity
        </h3>

        <Activity_Map
          data={messages}
          date_field="date"
          title="Messaging Activity"
          singular_label="message"
          plural_label="messages"
          color="blue"
        />

        <Messages_Table messages={messages} />
      </div>
    </Data_Section_Card>
  );
}

function No_Messages() {
  return (
    <Data_Section_Card
      value="direct-message"
      title="Direct Messages"
      description="Your TikTok direct messaging activity and conversation insights"
      icon={<MessageCircle className="h-6 w-6" />}
    >
      <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-8 text-center dark:border-gray-700 dark:bg-gray-800/50">
        <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">No messages found</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          You haven't sent or received any direct messages, or they were not included in your TikTok data export.
        </p>
      </div>
    </Data_Section_Card>
  );
}

function infer_user_username(direct_message: Direct_Message_Type, profile: Profile | null): string {
  const profile_username = profile?.["Profile Info"]?.ProfileMap?.userName;
  if (profile_username) return profile_username;

  const chat_history = direct_message["Direct Messages"].ChatHistory;
  const conversation_partners = Object.keys(chat_history);
  const all_from_values = new Set<string>();

  Object.values(chat_history).forEach((messages) => {
    messages.forEach((msg) => all_from_values.add(msg.From));
  });

  const potential_users = Array.from(all_from_values).filter((from) => !conversation_partners.includes(from));

  return potential_users[0] || "Unknown";
}

function flatten_messages(chat_history: Record<string, any[]>, user_username: string): Flat_Message[] {
  const messages: Flat_Message[] = [];

  Object.entries(chat_history).forEach(([conversation_with, message_list]) => {
    if (message_list.length === 0) return;

    message_list.forEach((msg) => {
      const date = new Date(msg.Date);
      if (isNaN(date.getTime()) || date.getFullYear() < 2010) return;

      messages.push({
        date: msg.Date,
        from: msg.From,
        content: msg.Content || "",
        conversation_with: conversation_with.replaceAll("Chat History with ", "").replaceAll(":", ""),
        is_sent: msg.From === user_username,
      });
    });
  });

  return messages;
}
