import { useData_store } from "@/stores/useData_store";
import { MessageCircle } from "lucide-react";
import { Direct_Message_Item } from "@/types/TikTok_Data_Schema";

export function Slide_Direct_Messages() {
  const direct_message = useData_store((state) => state.direct_message);

  const top_friends = get_top_chatted_friends(direct_message!["Direct Messages"].ChatHistory);

  if (top_friends.length === 0) {
    return (
      <>
        <p className="mb-4 text-2xl font-medium opacity-90">Your Top Friends</p>
        <MessageCircle className="mb-4 h-20 w-20 opacity-60" />
        <p className="text-xl opacity-80">No direct messages found</p>
      </>
    );
  }

  return (
    <>
      <p className="mb-4 text-2xl font-medium opacity-90">Your Top Friends</p>
      <p className="mb-2 text-lg opacity-70">Who you chatted most with</p>

      <div className="w-full max-w-lg space-y-4">
        {top_friends.map((friend, index) => (
          <div
            key={friend.name}
            className="flex items-center gap-4 rounded-xl bg-white/10 p-4 backdrop-blur-sm"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20 text-2xl font-bold">
              {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
            </div>
            <div className="flex-1 text-left">
              <p className="text-base font-semibold">{friend.name}</p>
              <p className="text-sm opacity-80">
                {friend.message_count} message{friend.message_count !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function get_top_chatted_friends(chat_history: Record<string, Direct_Message_Item[]>) {
  const one_year_ago = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);

  const friends = Object.entries(chat_history).map(([name, messages]) => {
    const recent_messages = messages.filter((message) => {
      if (!message.Date) return false;
      const message_date = new Date(message.Date);
      return !isNaN(message_date.getTime()) && message_date >= one_year_ago;
    });

    return {
      name,
      message_count: recent_messages.length,
    };
  });

  return friends
    .filter((friend) => friend.message_count > 0)
    .sort((a, b) => b.message_count - a.message_count)
    .slice(0, 3);
}
