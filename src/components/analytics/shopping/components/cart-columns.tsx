import { ColumnDef } from "@tanstack/react-table";
import Date_Display from "@/components/custom/Date_Display";
import { Tooltip, Tooltip_Content, Tooltip_Trigger } from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Shopping_Cart_Item_Schema } from "@/types/TikTok_Data_Schema";
import { z } from "zod";

type Shopping_Cart_Item = z.infer<typeof Shopping_Cart_Item_Schema>;

export const shopping_cart_columns: ColumnDef<Shopping_Cart_Item>[] = [
  {
    accessorKey: "CreateTime",
    header: "Added",
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
    accessorKey: "ProductName",
    header: "Product",
    cell: ({ getValue }) => {
      const product = getValue() as string;
      return (
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {product || <span className="text-gray-400 italic">Unknown Product</span>}
        </span>
      );
    },
  },
  {
    accessorKey: "ShopName",
    header: "Shop",
    cell: ({ getValue }) => {
      const shop = getValue() as string;
      return shop ? (
        <span className="rounded bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
          {shop}
        </span>
      ) : (
        <span className="text-xs text-gray-400 italic">N/A</span>
      );
    },
  },
  {
    accessorKey: "SkuCount",
    header: "Quantity",
    cell: ({ getValue }) => {
      const count = getValue() as number;
      return (
        <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
          {count}
        </span>
      );
    },
  },
];
