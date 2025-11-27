import { useMemo } from "react";
import { Login_History_Item } from "@/types/TikTok_Data_Schema";

export default function Analytics_Section({ login_history }: { login_history: Login_History_Item[] }) {
  const analytics = useMemo(() => {
    const unique_counts = calculate_unique_counts(login_history);
    const logins_by_day = group_logins_by_day(login_history);
    const daily_stats = calculate_daily_stats(login_history, logins_by_day);
    const most_common_hour = calculate_most_common_hour(login_history);
    const most_common_day_of_week = calculate_most_common_day_of_week(login_history);
    const avg_time_between_logins = calculate_avg_time_between_logins(login_history);

    return {
      total_logins: login_history.length,
      ...unique_counts,
      ...daily_stats,
      most_common_hour,
      most_common_day_of_week,
      avg_time_between_logins,
    };
  }, [login_history]);

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
      <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
        <Metric
          label="Total Logins"
          value={analytics.total_logins}
        />
        <Metric
          label="Avg. per Day"
          value={analytics.avg_logins_per_day}
        />
        <Metric
          label="Avg. Time Between"
          value={analytics.avg_time_between_logins}
          subtext="within same day"
        />
        <Metric
          label="Unique IPs"
          value={analytics.unique_ips}
        />
        <Metric
          label="Unique Devices"
          value={analytics.unique_devices}
        />
        <Metric
          label="Peak Day"
          value={`${analytics.max_day.count} logins`}
          subtext={analytics.max_day.date}
        />
        <Metric
          label="Low Day"
          value={`${analytics.min_day.count} logins`}
          subtext={analytics.min_day.date}
        />
        <Metric
          label="Peak Hour"
          value={analytics.most_common_hour.formatted}
        />
        <Metric
          label="Peak Weekday"
          value={analytics.most_common_day_of_week.day}
        />
      </div>
    </div>
  );
}

function calculate_unique_counts(login_history: Login_History_Item[]) {
  const unique_ips = new Set(login_history.map((item) => item.IP));
  const unique_devices = new Set(login_history.map((item) => `${item.DeviceModel}-${item.DeviceSystem}`));
  const unique_networks = new Set(login_history.map((item) => item.NetworkType));
  const unique_carriers = new Set(login_history.map((item) => item.Carrier).filter((c) => c && c.trim() !== ""));

  return {
    unique_ips: unique_ips.size,
    unique_devices: unique_devices.size,
    unique_networks: unique_networks.size,
    unique_carriers: unique_carriers.size,
  };
}

function group_logins_by_day(login_history: Login_History_Item[]) {
  const logins_by_day = new Map<string, number>();
  login_history.forEach((login) => {
    const date = new Date(login.Date);
    const day_key = date.toISOString().split("T")[0];
    logins_by_day.set(day_key, (logins_by_day.get(day_key) || 0) + 1);
  });
  return logins_by_day;
}

function calculate_daily_stats(login_history: Login_History_Item[], logins_by_day: Map<string, number>) {
  const total_days = logins_by_day.size;
  const avg_logins_per_day = total_days > 0 ? login_history.length / total_days : 0;

  let max_day = { date: "", count: 0 };
  let min_day = { date: "", count: Infinity };

  logins_by_day.forEach((count, date) => {
    if (count > max_day.count) {
      max_day = { date, count };
    }
    if (count < min_day.count) {
      min_day = { date, count };
    }
  });

  return {
    avg_logins_per_day: avg_logins_per_day.toFixed(1),
    max_day: {
      date: max_day.date
        ? new Date(max_day.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        : "N/A",
      count: max_day.count,
    },
    min_day: {
      date:
        min_day.date && min_day.count !== Infinity
          ? new Date(min_day.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
          : "N/A",
      count: min_day.count !== Infinity ? min_day.count : 0,
    },
  };
}

function calculate_most_common_hour(login_history: Login_History_Item[]) {
  const hour_counts = new Map<number, number>();
  login_history.forEach((login) => {
    const hour = new Date(login.Date).getHours();
    hour_counts.set(hour, (hour_counts.get(hour) || 0) + 1);
  });

  let most_common_hour = { hour: 0, count: 0 };
  hour_counts.forEach((count, hour) => {
    if (count > most_common_hour.count) {
      most_common_hour = { hour, count };
    }
  });

  return {
    hour: most_common_hour.hour,
    formatted: `${most_common_hour.hour % 12 || 12}${most_common_hour.hour >= 12 ? "PM" : "AM"}`,
    count: most_common_hour.count,
  };
}

function calculate_most_common_day_of_week(login_history: Login_History_Item[]) {
  const day_of_week_counts = new Map<number, number>();
  const day_names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  login_history.forEach((login) => {
    const day = new Date(login.Date).getDay();
    day_of_week_counts.set(day, (day_of_week_counts.get(day) || 0) + 1);
  });

  let most_common_day_of_week = { day: 0, count: 0 };
  day_of_week_counts.forEach((count, day) => {
    if (count > most_common_day_of_week.count) {
      most_common_day_of_week = { day, count };
    }
  });

  return {
    day: day_names[most_common_day_of_week.day],
    count: most_common_day_of_week.count,
  };
}

function calculate_avg_time_between_logins(login_history: Login_History_Item[]) {
  const time_diffs: number[] = [];
  const logins_by_day = new Map<string, Date[]>();

  login_history.forEach((login) => {
    const date = new Date(login.Date);
    const day_key = date.toISOString().split("T")[0];
    if (!logins_by_day.has(day_key)) {
      logins_by_day.set(day_key, []);
    }
    logins_by_day.get(day_key)!.push(date);
  });

  logins_by_day.forEach((dates) => {
    if (dates.length > 1) {
      const sorted = dates.sort((a, b) => a.getTime() - b.getTime());
      for (let i = 1; i < sorted.length; i++) {
        const diff_ms = sorted[i].getTime() - sorted[i - 1].getTime();
        time_diffs.push(diff_ms);
      }
    }
  });

  const avg_time_ms = time_diffs.length > 0 ? time_diffs.reduce((sum, diff) => sum + diff, 0) / time_diffs.length : 0;

  const hours = avg_time_ms / (1000 * 60 * 60);
  return hours >= 1 ? `${hours.toFixed(1)}h` : `${Math.round(avg_time_ms / (1000 * 60))}m`;
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
