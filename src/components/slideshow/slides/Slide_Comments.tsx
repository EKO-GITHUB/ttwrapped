import { format_number } from "@/components/slideshow/format_number";
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
      <p className="mb-4 text-lg font-medium opacity-80">Comments Posted</p>
      <p className="mb-4 text-7xl font-bold">{format_number(count)}</p>
      <p className="text-xl opacity-80">{count > 100 ? "You love to share your thoughts!" : "Quality over quantity"}</p>
      {top_emoji && (
        <div className="mt-6 space-y-2">
          <p className="text-lg opacity-60">Your favorite emoji</p>
          <p className="text-6xl">{top_emoji.emoji}</p>
          <p className="text-sm opacity-50">used {format_number(top_emoji.count)} times</p>
        </div>
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
