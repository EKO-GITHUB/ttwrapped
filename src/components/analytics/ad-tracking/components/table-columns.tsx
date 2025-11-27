import { ColumnDef } from "@tanstack/react-table";
import Date_Display from "@/components/custom/Date_Display";
import { Tooltip, Tooltip_Content, Tooltip_Trigger } from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Off_TikTok_Activity_DataList } from "@/types/TikTok_Data_Schema";

export const activity_table_columns: ColumnDef<Off_TikTok_Activity_DataList>[] = [
  {
    accessorKey: "Event",
    header: "Event Type",
    cell: ({ getValue }) => (
      <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: "Source",
    header: "Source",
    cell: ({ getValue }) => <span className="text-sm text-gray-600 dark:text-gray-400">{getValue() as string}</span>,
  },
  {
    accessorKey: "TimeStamp",
    header: "Time",
    cell: ({ getValue }) => {
      const timestamp = getValue() as string;
      const formatted_date = new Date(timestamp).toLocaleString("en-US", {
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
                  date={timestamp}
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
];
