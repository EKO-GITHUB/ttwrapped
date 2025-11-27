type Date_Display_Props = {
  date: Date | string;
  format?: "full" | "short" | "relative";
  className?: string;
};

export default function Date_Display({ date, format = "full", className = "" }: Date_Display_Props) {
  const date_obj = typeof date === "string" ? new Date(date) : date;

  const format_date = () => {
    if (format === "short") {
      return date_obj.toLocaleDateString();
    }

    if (format === "relative") {
      const now = new Date();
      const diff_ms = now.getTime() - date_obj.getTime();
      const diff_days = Math.floor(diff_ms / (1000 * 60 * 60 * 24));

      if (diff_days === 0) return "Today";
      if (diff_days === 1) return "Yesterday";
      if (diff_days < 7) return `${diff_days} days ago`;
      if (diff_days < 30) return `${Math.floor(diff_days / 7)} weeks ago`;
      if (diff_days < 365) return `${Math.floor(diff_days / 30)} months ago`;
      return `${Math.floor(diff_days / 365)} years ago`;
    }

    // full format
    return date_obj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <time
      dateTime={date_obj.toISOString()}
      className={className}
    >
      {format_date()}
    </time>
  );
}
