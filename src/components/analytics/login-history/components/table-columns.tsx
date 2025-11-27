import { ColumnDef } from "@tanstack/react-table";
import Date_Display from "@/components/custom/Date_Display";
import { Tooltip, Tooltip_Content, Tooltip_Trigger } from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Login_History_Item } from "@/types/TikTok_Data_Schema";

export const login_history_table_columns: ColumnDef<Login_History_Item>[] = [
  {
    accessorKey: "Date",
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
    accessorKey: "IP",
    header: "IP Address",
    cell: ({ getValue }) => {
      const ip = getValue() as string;
      return (
        <span className="font-mono text-sm text-gray-700 dark:text-gray-300">
          {ip || <span className="text-gray-400 italic">N/A</span>}
        </span>
      );
    },
  },
  {
    accessorKey: "DeviceModel",
    header: "Device",
    cell: ({ row }) => {
      const device_model = row.getValue("DeviceModel") as string;
      const device_system = row.getValue("DeviceSystem") as string;
      return (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {device_model || <span className="text-gray-400 italic">Unknown</span>}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {device_system || <span className="italic">N/A</span>}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "DeviceSystem",
    header: "System",
    cell: ({ getValue }) => {
      const system = getValue() as string;
      return system ? (
        <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
          {system}
        </span>
      ) : (
        <span className="text-xs text-gray-400 italic">N/A</span>
      );
    },
  },
  {
    accessorKey: "NetworkType",
    header: "Network",
    cell: ({ getValue }) => {
      const network = getValue() as string;
      return network ? (
        <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
          {network}
        </span>
      ) : (
        <span className="text-xs text-gray-400 italic">N/A</span>
      );
    },
  },
  {
    accessorKey: "Carrier",
    header: "Carrier",
    cell: ({ getValue }) => {
      const carrier = getValue() as string;
      return (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {carrier || <span className="text-gray-400 italic">N/A</span>}
        </span>
      );
    },
  },
];
