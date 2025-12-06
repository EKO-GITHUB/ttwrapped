"use client";

import { motion } from "framer-motion";
import { format_number } from "@/components/slideshow/format_number";
import { Animated_Number } from "@/components/slideshow/Animated_Number";
import { Comment } from "@/types/TikTok_Data_Schema";
import { useData_store } from "@/stores/useData_store";

export function Slide_Comments() {
  const comment = useData_store((state) => state.comment);
  const stats = useData_store((state) => state.stats);

  if (!comment || !stats) return null;

  const count = stats.comment_count;
  const top_emoji = get_most_used_emoji(comment);

  return (
    <>
      <motion.p
        className="mb-4 text-lg font-medium opacity-80"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Comments Posted
      </motion.p>
      <motion.p
        className="mb-4 text-7xl font-bold"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4, type: "spring", bounce: 0.3 }}
      >
        <motion.span
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        >
          <Animated_Number value={count} duration={1.8} format={format_number} />
        </motion.span>
      </motion.p>
      <motion.p
        className="text-xl opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        {count > 100 ? "You love to share your thoughts!" : "Quality over quantity"}
      </motion.p>
      {top_emoji && (
        <motion.div
          className="mt-6 space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.0 }}
        >
          <motion.p
            className="text-lg opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.5, delay: 2.2 }}
          >
            Your favorite emoji
          </motion.p>
          <motion.p
            className="text-6xl"
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 2.4, type: "spring", bounce: 0.5 }}
          >
            <motion.span
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            >
              {top_emoji.emoji}
            </motion.span>
          </motion.p>
          <motion.p
            className="text-sm opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.5, delay: 2.8 }}
          >
            used <Animated_Number value={top_emoji.count} duration={1.2} format={format_number} /> times
          </motion.p>
        </motion.div>
      )}
    </>
  );
}

function get_most_used_emoji(comment_section: Comment): { emoji: string; count: number } | null {
  const comments = comment_section.Comments?.CommentsList;
  if (!comments || comments.length === 0) return null;

  const emoji_regex = /\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu;
  const emoji_counts = new Map<string, number>();

  for (const comment of comments) {
    const emojis = comment.comment.match(emoji_regex);
    if (emojis) {
      for (const emoji of emojis) {
        emoji_counts.set(emoji, (emoji_counts.get(emoji) || 0) + 1);
      }
    }
  }

  if (emoji_counts.size === 0) return null;

  let top_emoji = "";
  let max_count = 0;
  for (const [emoji, count] of emoji_counts) {
    if (count > max_count) {
      top_emoji = emoji;
      max_count = count;
    }
  }

  return { emoji: top_emoji, count: max_count };
}
