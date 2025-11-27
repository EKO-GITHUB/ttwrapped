import { ColumnDef } from "@tanstack/react-table";
import Date_Display from "@/components/custom/Date_Display";
import { Tooltip, Tooltip_Content, Tooltip_Trigger } from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ChevronDown, ChevronRight } from "lucide-react";

type Live_Stream_With_ID = {
  stream_id: string;
  WatchTime: string;
  Link: string;
  Comments: Array<{
    CommentTime: string;
    CommentContent: string;
    RawTime: number;
  }>;
  Questions: null;
};

export const live_streams_table_columns: ColumnDef<Live_Stream_With_ID>[] = [
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => {
      const has_comments = row.original.Comments.length > 0;
      if (!has_comments) return null;

      return (
        <button
          onClick={row.getToggleExpandedHandler()}
          className="rounded p-1 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {row.getIsExpanded() ? (
            <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          )}
        </button>
      );
    },
  },
  {
    accessorKey: "WatchTime",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-gray-100"
        >
          Watch Date & Time
          <span className="text-gray-400">
            {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
          </span>
        </button>
      );
    },
    sortingFn: (rowA, rowB) => {
      const dateA = new Date(rowA.original.WatchTime).getTime();
      const dateB = new Date(rowB.original.WatchTime).getTime();
      return dateA - dateB;
    },
    cell: ({ getValue }) => {
      const date_string = getValue() as string;
      const formatted_date = new Date(date_string).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      });
      return (
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <Tooltip_Trigger asChild>
              <div className="max-w-max cursor-help">
                <Date_Display
                  date={date_string}
                  format="relative"
                  className="text-xs text-gray-500 underline decoration-dashed dark:text-gray-400"
                />
              </div>
            </Tooltip_Trigger>
            <Tooltip_Content>
              <p>{formatted_date}</p>
            </Tooltip_Content>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    id: "comments",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-gray-100"
        >
          Comments
          <span className="text-gray-400">
            {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
          </span>
        </button>
      );
    },
    accessorFn: (row) => row.Comments.length,
    cell: ({ row }) => {
      const comments_count = row.original.Comments.length;

      let badge_color = "bg-gray-100 text-gray-700 dark:bg-gray-800/50 dark:text-gray-300";
      if (comments_count >= 11) {
        badge_color = "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300";
      } else if (comments_count >= 6) {
        badge_color = "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
      } else if (comments_count >= 1) {
        badge_color = "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      }

      return (
        <span className={`inline-block rounded px-2 py-1 text-xs font-medium ${badge_color}`}>
          {comments_count} {comments_count === 1 ? "comment" : "comments"}
        </span>
      );
    },
  },
];
