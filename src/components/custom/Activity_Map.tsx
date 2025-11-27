"use client";

import { useMemo, useState } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { Tooltip_Content, Tooltip_Provider, Tooltip_Trigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type Day_Data = {
  date: Date;
  count: number;
  date_string: string;
};

type Month_Label = {
  label: string;
  colspan: number;
};

type Activity_Map_Props<T> = {
  data: T[];
  date_field: keyof T;
  title: string;
  singular_label: string;
  plural_label: string;
  color?: "green" | "purple" | "blue" | "orange" | "red";
};

const COLOR_SCHEMES = {
  green: [
    "bg-[#9be9a8] dark:bg-[#0e4429]",
    "bg-[#40c463] dark:bg-[#006d32]",
    "bg-[#30a14e] dark:bg-[#26a641]",
    "bg-[#216e39] dark:bg-[#39d353]",
  ],
  purple: [
    "bg-purple-300 dark:bg-purple-900/60",
    "bg-purple-400 dark:bg-purple-800/80",
    "bg-purple-500 dark:bg-purple-700",
    "bg-purple-600 dark:bg-purple-600",
  ],
  blue: [
    "bg-blue-300 dark:bg-blue-900/60",
    "bg-blue-400 dark:bg-blue-800/80",
    "bg-blue-500 dark:bg-blue-700",
    "bg-blue-600 dark:bg-blue-600",
  ],
  orange: [
    "bg-orange-300 dark:bg-orange-900/60",
    "bg-orange-400 dark:bg-orange-800/80",
    "bg-orange-500 dark:bg-orange-700",
    "bg-orange-600 dark:bg-orange-600",
  ],
  red: [
    "bg-red-300 dark:bg-red-900/60",
    "bg-red-400 dark:bg-red-800/80",
    "bg-red-500 dark:bg-red-700",
    "bg-red-600 dark:bg-red-600",
  ],
};

export default function Activity_Map<T>({
  data,
  date_field,
  title,
  singular_label,
  plural_label,
  color = "green",
}: Activity_Map_Props<T>) {
  const [open_tooltip, set_open_tooltip] = useState<string | null>(null);

  const { days_by_week, max_count, month_labels, total_count } = useMemo(() => {
    const activity_by_day = group_activity_by_day(data, date_field);
    const date_range = get_week_aligned_range(activity_by_day);

    if (!date_range) {
      return { days_by_week: [], max_count: 0, month_labels: [], total_count: 0 };
    }

    const all_days = generate_day_data(date_range.start_date, date_range.end_date, activity_by_day);
    const weeks = group_into_weeks(all_days);
    const days_by_week = transpose_weeks_to_days(weeks);
    const max_count = Math.max(...Array.from(activity_by_day.values()));
    const month_labels = generate_month_labels_with_colspan(weeks);
    const total_count = Array.from(activity_by_day.values()).reduce((a, b) => a + b, 0);

    return { days_by_week, max_count, month_labels, total_count };
  }, [data, date_field]);

  const color_scheme = COLOR_SCHEMES[color];

  if (days_by_week.length === 0) {
    return null;
  }

  return (
    <div className="w-full min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <Tooltip_Provider delayDuration={50}>
        <div className="w-full overflow-x-auto pb-2">
          <table className="mx-auto border-separate border-spacing-[4px]">
            <thead>
              <tr>
                <td className="h-[14px] w-[32px]" />
                {month_labels.map((month, index) => (
                  <td
                    key={index}
                    colSpan={month.colspan}
                    className="text-left text-xs text-gray-500 dark:text-gray-400"
                    style={{ height: "24px", verticalAlign: "bottom" }}
                  >
                    {month.label}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {days_by_week.map((day_row, day_index) => (
                <tr
                  key={day_index}
                  className="h-[14px]"
                >
                  <td className="relative h-[14px] w-[32px] pr-2 text-right text-[10px] leading-[14px] text-gray-500 dark:text-gray-400">
                    {day_index === 1 && <span>Mon</span>}
                    {day_index === 3 && <span>Wed</span>}
                    {day_index === 5 && <span>Fri</span>}
                  </td>
                  {day_row.map((day, week_index) =>
                    day ? (
                      <TooltipPrimitive.Root
                        key={week_index}
                        open={open_tooltip === day.date_string}
                        onOpenChange={(open) => {
                          set_open_tooltip(open ? day.date_string : null);
                        }}
                      >
                        <Tooltip_Trigger asChild>
                          <td
                            className={cn(
                              "h-[14px] w-[14px] min-w-[14px] cursor-pointer rounded-[3px] transition-colors hover:opacity-80",
                              get_color_class(day.count, max_count, color_scheme),
                            )}
                            data-date={day.date_string}
                            data-count={day.count}
                            onClick={() => {
                              set_open_tooltip(open_tooltip === day.date_string ? null : day.date_string);
                            }}
                          />
                        </Tooltip_Trigger>
                        <Tooltip_Content className="relative bg-gray-900 pr-8 text-xs text-white dark:bg-gray-700">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              set_open_tooltip(null);
                            }}
                            className="absolute top-1.5 right-1.5 rounded-sm opacity-70 transition-opacity hover:opacity-100"
                            aria-label="Close"
                          >
                            <X className="h-3 w-3" />
                          </button>
                          <div className="whitespace-nowrap">
                            <span className="font-semibold">
                              {day.count} {day.count === 1 ? singular_label : plural_label}
                            </span>{" "}
                            <span className="text-gray-400">on</span>{" "}
                            {day.date.toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        </Tooltip_Content>
                      </TooltipPrimitive.Root>
                    ) : (
                      <td
                        key={week_index}
                        className="h-[14px] w-[14px]"
                      />
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Tooltip_Provider>

      <div className="mt-6 flex items-center justify-end gap-2 text-xs text-gray-500 dark:text-gray-400">
        <span>Less</span>
        <div className="flex gap-[4px]">
          <div className="h-[14px] w-[14px] rounded-[3px] bg-[#ebedf0] dark:bg-[#161b22]"></div>
          {color_scheme.map((color_class, index) => (
            <div
              key={index}
              className={`h-[14px] w-[14px] rounded-[3px] ${color_class}`}
            ></div>
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}

function group_activity_by_day<T>(data: T[], date_field: keyof T) {
  const activity_by_day = new Map<string, number>();
  data.forEach((item) => {
    const date_value = item[date_field];
    if (typeof date_value === "string") {
      const date = new Date(date_value);
      if (!isNaN(date.getTime()) && date.getFullYear() >= 2010) {
        const day_key = date.toISOString().split("T")[0];
        activity_by_day.set(day_key, (activity_by_day.get(day_key) || 0) + 1);
      }
    }
  });
  return activity_by_day;
}

function get_week_aligned_range(activity_by_day: Map<string, number>) {
  const sorted_dates = Array.from(activity_by_day.keys()).sort();
  if (sorted_dates.length === 0) {
    return null;
  }

  const first_date = new Date(sorted_dates[0]);
  const last_date = new Date(sorted_dates[sorted_dates.length - 1]);

  const start_date = new Date(first_date);
  start_date.setDate(start_date.getDate() - start_date.getDay());

  const end_date = new Date(last_date);
  end_date.setDate(end_date.getDate() + (6 - end_date.getDay()));

  return { start_date, end_date };
}

function generate_day_data(start_date: Date, end_date: Date, activity_by_day: Map<string, number>): Day_Data[] {
  const all_days: Day_Data[] = [];
  const current = new Date(start_date);

  while (current <= end_date) {
    const day_key = current.toISOString().split("T")[0];
    const count = activity_by_day.get(day_key) || 0;
    all_days.push({
      date: new Date(current),
      count,
      date_string: day_key,
    });
    current.setDate(current.getDate() + 1);
  }

  return all_days;
}

function group_into_weeks(all_days: Day_Data[]): Day_Data[][] {
  const weeks: Day_Data[][] = [];
  for (let i = 0; i < all_days.length; i += 7) {
    weeks.push(all_days.slice(i, i + 7));
  }
  return weeks;
}

function transpose_weeks_to_days(weeks: Day_Data[][]): (Day_Data | null)[][] {
  const days_by_week: (Day_Data | null)[][] = [[], [], [], [], [], [], []];

  weeks.forEach((week) => {
    for (let day_index = 0; day_index < 7; day_index++) {
      days_by_week[day_index].push(week[day_index] || null);
    }
  });

  return days_by_week;
}

function generate_month_labels_with_colspan(weeks: Day_Data[][]): Month_Label[] {
  const month_labels: Month_Label[] = [];
  let current_month = -1;
  let current_colspan = 0;

  weeks.forEach((week, index) => {
    const first_day = week[0];
    if (first_day) {
      const month = first_day.date.getMonth();

      if (month !== current_month) {
        if (current_colspan > 0) {
          month_labels[month_labels.length - 1].colspan = current_colspan;
        }

        month_labels.push({
          label: first_day.date.toLocaleDateString("en-US", { month: "short" }),
          colspan: 1,
        });
        current_month = month;
        current_colspan = 1;
      } else {
        current_colspan++;
      }
    }
  });

  if (current_colspan > 0 && month_labels.length > 0) {
    month_labels[month_labels.length - 1].colspan = current_colspan;
  }

  return month_labels;
}

function get_color_class(count: number, max_count: number, color_scheme: string[]) {
  if (count === 0) return "bg-[#ebedf0] dark:bg-[#161b22]";

  if (max_count === 0) return color_scheme[0];

  const ratio = count / max_count;
  let level = 0;
  if (ratio > 0) level = 1;
  if (ratio >= 0.25) level = 2;
  if (ratio >= 0.5) level = 3;
  if (ratio >= 0.75) level = 4;

  // Ensure level is 1-4
  level = Math.max(1, Math.min(4, level));

  return color_scheme[level - 1];
}
