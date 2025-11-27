import { ColumnDef } from "@tanstack/react-table";
import Date_Display from "@/components/custom/Date_Display";
import { Tooltip, Tooltip_Content, Tooltip_Trigger } from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Comment_Item } from "@/types/TikTok_Data_Schema";

export const comments_table_columns: ColumnDef<Comment_Item>[] = [
  {
    accessorKey: "date",
    header: "Date & Time",
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
    accessorKey: "comment",
    header: "Comment",
    cell: ({ getValue }) => {
      const comment = getValue() as string;
      const display_comment = comment && comment.trim() !== "" ? comment : null;

      if (!display_comment) {
        return <span className="text-sm text-gray-400 italic">No text</span>;
      }

      return (
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <Tooltip_Trigger asChild>
              <div className="max-w-lg cursor-help">
                <span className="text-sm text-gray-900 dark:text-gray-100">{display_comment}</span>
              </div>
            </Tooltip_Trigger>
            <Tooltip_Content className="max-w-sm">
              <p className="whitespace-pre-wrap">{display_comment}</p>
            </Tooltip_Content>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
];
