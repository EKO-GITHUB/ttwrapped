import { ColumnDef } from "@tanstack/react-table";
import Date_Display from "@/components/custom/Date_Display";
import { Tooltip, Tooltip_Content, Tooltip_Trigger } from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

export type Flat_Message = {
  date: string;
  from: string;
  content: string;
  conversation_with: string;
  is_sent: boolean;
};

export const messages_table_columns: ColumnDef<Flat_Message>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-gray-100"
        >
          Date & Time
          <span className="text-gray-400">
            {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
          </span>
        </button>
      );
    },
    sortingFn: (rowA, rowB) => {
      const dateA = new Date(rowA.original.date).getTime();
      const dateB = new Date(rowB.original.date).getTime();
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
    accessorKey: "conversation_with",
    header: "Conversation With",
    cell: ({ row }) => {
      const { conversation_with, is_sent } = row.original;
      return (
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900 dark:text-gray-100">{conversation_with}</span>
          <span
            className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${
              is_sent
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
            }`}
          >
            {is_sent ? "Sent" : "Received"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "content",
    header: "Message",
    cell: ({ getValue }) => {
      const content = getValue() as string;
      const display_content = content?.trim() || null;

      if (!display_content) {
        return <span className="text-sm italic text-gray-400">No text</span>;
      }

      const is_long = content.length > 100;
      const display_text = is_long ? content.substring(0, 100) + "..." : content;

      return (
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <Tooltip_Trigger asChild>
              <div className="max-w-lg cursor-help">
                <span className="text-sm text-gray-900 dark:text-gray-100">{display_text}</span>
              </div>
            </Tooltip_Trigger>
            <Tooltip_Content className="max-w-sm">
              <p className="whitespace-pre-wrap">{content}</p>
            </Tooltip_Content>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    id: "direction",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-gray-100"
        >
          Direction
          <span className="text-gray-400">
            {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
          </span>
        </button>
      );
    },
    accessorFn: (row) => (row.is_sent ? "sent" : "received"),
    cell: ({ row }) => {
      const is_sent = row.original.is_sent;
      return (
        <div className="flex items-center gap-1">
          {is_sent ? (
            <ArrowUpRight className="h-4 w-4 text-blue-500 dark:text-blue-400" />
          ) : (
            <ArrowDownLeft className="h-4 w-4 text-green-500 dark:text-green-400" />
          )}
          <span className="text-xs capitalize text-gray-700 dark:text-gray-300">
            {is_sent ? "Sent" : "Received"}
          </span>
        </div>
      );
    },
  },
];
