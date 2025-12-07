"use client";

import { useData_store } from "@/stores/useData_store";
import { Direct_Message_Item } from "@/types/TikTok_Data_Schema";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function Slide_Direct_Messages() {
  const direct_message = useData_store((state) => state.direct_message);

  const top_friends = get_top_chatted_friends(direct_message!["Direct Messages"].ChatHistory);

  if (top_friends.length === 0) {
    return (
      <>
        <motion.p
          className="mb-4 text-2xl font-medium opacity-90"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Your Top Friends
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <MessageCircle className="mb-4 h-20 w-20 opacity-60" />
        </motion.div>
        <motion.p
          className="text-xl opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          No direct messages found
        </motion.p>
      </>
    );
  }

  return (
    <>
      <motion.p
        className="mb-4 text-2xl font-medium opacity-90"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.9, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Your Top Friends
      </motion.p>
      <motion.p
        className="mb-2 text-lg opacity-70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Who you chatted most with
      </motion.p>

      <div className="w-full max-w-lg space-y-4 px-6">
        {top_friends.map((friend, index) => (
          <motion.div
            key={friend.name}
            className="flex items-center gap-4 rounded-xl bg-slate-800/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0, x: -50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.6 + index * 0.2,
              type: "spring",
              bounce: 0.3,
            }}
          >
            <motion.div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20 text-2xl font-bold"
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.8 + index * 0.2,
                type: "spring",
                bounce: 0.5,
              }}
            >
              {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
            </motion.div>
            <div className="flex-1 text-left">
              <p className="text-base font-semibold">{friend.name}</p>
              <p className="text-sm opacity-80">
                {friend.message_count} message{friend.message_count !== 1 ? "s" : ""}
              </p>
            </div>
          </motion.div>
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

    console.log(name, recent_messages.length);

    return {
      name: name.replaceAll("Chat History with ", "").replaceAll(":", ""),
      message_count: recent_messages.length,
    };
  });

  return friends
    .filter((friend) => friend.message_count > 0)
    .sort((a, b) => b.message_count - a.message_count)
    .slice(0, 3);
}
