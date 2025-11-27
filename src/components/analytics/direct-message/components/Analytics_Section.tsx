import { useMemo } from "react";
import { Flat_Message } from "./Messages_Table_Columns";

type Analytics_Props = {
  messages: Flat_Message[];
  user_username: string;
};

export default function Analytics_Section({ messages, user_username }: Analytics_Props) {
  const analytics = useMemo(() => {
    const total_conversations = get_total_conversations(messages);
    const total_messages = messages.length;
    const messages_sent = messages.filter((m) => m.is_sent).length;
    const messages_received = total_messages - messages_sent;

    const messages_this_year = get_messages_this_year(messages);
    const messages_this_month = get_messages_this_month(messages);
    const most_recent = get_most_recent_message(messages);
    const messages_by_month = group_messages_by_month(messages);
    const most_active_month = get_most_active_month(messages_by_month);

    const most_active_conversation = get_most_active_conversation(messages);
    const avg_per_conversation = calculate_avg_per_conversation(messages);
    const sent_received_ratio = calculate_sent_received_ratio(messages);
    const peak_period = get_peak_messaging_period(messages);

    const avg_length = calculate_avg_message_length(messages);
    const longest = get_longest_message(messages);
    const emoji_stats = calculate_emoji_stats(messages);
    const mention_stats = calculate_mention_stats(messages);

    return {
      total_conversations,
      total_messages,
      messages_sent,
      messages_received,
      messages_this_year,
      messages_this_month,
      most_recent,
      most_active_month,
      most_active_conversation,
      avg_per_conversation,
      sent_received_ratio,
      peak_period,
      avg_length,
      longest,
      emoji_stats,
      mention_stats,
    };
  }, [messages, user_username]);

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
      <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
        <Metric label="Total Conversations" value={analytics.total_conversations} />
        <Metric label="Total Messages" value={analytics.total_messages} />
        <Metric label="Messages Sent" value={analytics.messages_sent} />
        <Metric label="Messages Received" value={analytics.messages_received} />

        <Metric label="This Year" value={analytics.messages_this_year} subtext="messages" />
        <Metric label="This Month" value={analytics.messages_this_month} subtext="messages" />
        <Metric label="Most Recent" value={analytics.most_recent.formatted} subtext={analytics.most_recent.relative} />
        <Metric
          label="Most Active Month"
          value={analytics.most_active_month.month}
          subtext={`${analytics.most_active_month.count} messages`}
        />

        <Metric
          label="Most Active Conversation"
          value={analytics.most_active_conversation.username}
          subtext={`${analytics.most_active_conversation.count} messages`}
        />
        <Metric label="Avg per Conversation" value={analytics.avg_per_conversation} subtext="messages" />
        <Metric label="Sent/Received" value={analytics.sent_received_ratio.display} />
        <Metric label="Peak Period" value={analytics.peak_period.period} subtext={`${analytics.peak_period.count} messages`} />

        <Metric label="Avg. Message Length" value={analytics.avg_length} subtext="characters" />
        <Metric label="Longest Message" value={`${analytics.longest.length} chars`} />
        <Metric
          label="With Emojis"
          value={`${analytics.emoji_stats.percentage}%`}
          subtext={`${analytics.emoji_stats.count} messages`}
        />
        <Metric
          label="With Mentions"
          value={`${analytics.mention_stats.percentage}%`}
          subtext={`${analytics.mention_stats.count} messages`}
        />
      </div>
    </div>
  );
}

function get_total_conversations(messages: Flat_Message[]) {
  const unique_conversations = new Set(messages.map((m) => m.conversation_with));
  return unique_conversations.size;
}

function get_messages_this_year(messages: Flat_Message[]) {
  const current_year = new Date().getFullYear();
  return messages.filter((m) => new Date(m.date).getFullYear() === current_year).length;
}

function get_messages_this_month(messages: Flat_Message[]) {
  const now = new Date();
  const current_year = now.getFullYear();
  const current_month = now.getMonth();
  return messages.filter((m) => {
    const date = new Date(m.date);
    return date.getFullYear() === current_year && date.getMonth() === current_month;
  }).length;
}

function get_most_recent_message(messages: Flat_Message[]) {
  if (messages.length === 0) return { formatted: "N/A", relative: "" };

  const most_recent = messages.reduce((latest, m) => {
    const m_date = new Date(m.date);
    const latest_date = new Date(latest.date);
    return m_date > latest_date ? m : latest;
  });

  const date = new Date(most_recent.date);
  const formatted = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const now = new Date();
  const days_ago = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  const relative = days_ago === 0 ? "today" : days_ago === 1 ? "yesterday" : `${days_ago} days ago`;

  return { formatted, relative };
}

function group_messages_by_month(messages: Flat_Message[]) {
  const messages_by_month = new Map<string, number>();
  messages.forEach((m) => {
    const date = new Date(m.date);
    const month_key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    messages_by_month.set(month_key, (messages_by_month.get(month_key) || 0) + 1);
  });
  return messages_by_month;
}

function get_most_active_month(messages_by_month: Map<string, number>) {
  if (messages_by_month.size === 0) return { month: "N/A", count: 0 };

  let most_active = { month: "", count: 0 };
  messages_by_month.forEach((count, month_key) => {
    if (count > most_active.count) {
      most_active = { month: month_key, count };
    }
  });

  const [year, month] = most_active.month.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  const formatted_month = date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  return { month: formatted_month, count: most_active.count };
}

function get_most_active_conversation(messages: Flat_Message[]) {
  if (messages.length === 0) return { username: "N/A", count: 0 };

  const conversation_counts = new Map<string, number>();
  messages.forEach((m) => {
    const partner = m.conversation_with;
    conversation_counts.set(partner, (conversation_counts.get(partner) || 0) + 1);
  });

  let most_active = { username: "", count: 0 };
  conversation_counts.forEach((count, username) => {
    if (count > most_active.count) {
      most_active = { username, count };
    }
  });

  return most_active;
}

function calculate_avg_per_conversation(messages: Flat_Message[]) {
  const total_conversations = get_total_conversations(messages);
  if (total_conversations === 0) return "0";
  return (messages.length / total_conversations).toFixed(1);
}

function calculate_sent_received_ratio(messages: Flat_Message[]) {
  if (messages.length === 0) return { sent: 0, received: 0, display: "N/A" };

  const sent_count = messages.filter((m) => m.is_sent).length;
  const received_count = messages.length - sent_count;

  const sent_pct = Math.round((sent_count / messages.length) * 100);
  const received_pct = 100 - sent_pct;

  return {
    sent: sent_count,
    received: received_count,
    display: `${sent_pct}/${received_pct}%`,
  };
}

function get_peak_messaging_period(messages: Flat_Message[]) {
  if (messages.length === 0) return { period: "N/A", count: 0 };

  const hours_map = new Map<number, number>();

  messages.forEach((m) => {
    const date = new Date(m.date);
    const hour = date.getHours();
    hours_map.set(hour, (hours_map.get(hour) || 0) + 1);
  });

  let max_count = 0;
  let peak_start = 0;

  for (let h = 0; h < 24; h++) {
    const window_count = (hours_map.get(h) || 0) + (hours_map.get((h + 1) % 24) || 0);
    if (window_count > max_count) {
      max_count = window_count;
      peak_start = h;
    }
  }

  const format_hour = (h: number) => {
    const period = h >= 12 ? "PM" : "AM";
    const display_hour = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${display_hour} ${period}`;
  };

  const period = `${format_hour(peak_start)}-${format_hour((peak_start + 2) % 24)}`;
  return { period, count: max_count };
}

function calculate_avg_message_length(messages: Flat_Message[]) {
  if (messages.length === 0) return "0";
  const total_length = messages.reduce((sum, m) => sum + m.content.length, 0);
  return (total_length / messages.length).toFixed(1);
}

function get_longest_message(messages: Flat_Message[]) {
  if (messages.length === 0) return { length: 0 };
  const longest = messages.reduce((max, m) => (m.content.length > max.content.length ? m : max));
  return { length: longest.content.length };
}

function calculate_emoji_stats(messages: Flat_Message[]) {
  if (messages.length === 0) return { count: 0, percentage: 0 };
  const emoji_regex = /\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu;
  const count = messages.filter((m) => emoji_regex.test(m.content)).length;
  return { count, percentage: Math.round((count / messages.length) * 100) };
}

function calculate_mention_stats(messages: Flat_Message[]) {
  if (messages.length === 0) return { count: 0, percentage: 0 };
  const mention_regex = /@\w+/g;
  const count = messages.filter((m) => mention_regex.test(m.content)).length;
  return { count, percentage: Math.round((count / messages.length) * 100) };
}

function Metric({ label, value, subtext }: { label: string; value: string | number; subtext?: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
      <span className="mt-0.5 text-lg font-semibold text-gray-900 dark:text-gray-100">{value}</span>
      {subtext && <span className="text-xs text-gray-500 dark:text-gray-400">{subtext}</span>}
    </div>
  );
}
