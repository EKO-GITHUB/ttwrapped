"use client";

import { useMemo, useState } from "react";
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ShoppingCart } from "lucide-react";
import { shopping_cart_columns } from "./cart-columns";
import { Shopping_Cart_Item } from "@/types/TikTok_Data_Schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Cart_Table({ cart_items }: { cart_items: Shopping_Cart_Item[] }) {
  const [selected_shop, set_selected_shop] = useState<string>("all");

  const available_shops = useMemo(() => calculate_available_shops(cart_items), [cart_items]);

  const filtered_items = useMemo(() => apply_shop_filter(cart_items, selected_shop), [cart_items, selected_shop]);

  const columns = useMemo(() => shopping_cart_columns, []);

  const table = useReactTable({
    data: filtered_items,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100">
          <ShoppingCart className="h-5 w-5" />
          Shopping Cart
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            ({filtered_items.length} of {cart_items.length})
          </span>
        </h4>
      </div>

      {available_shops.length > 0 && (
        <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by Shop:</label>
            <Select
              value={selected_shop}
              onValueChange={set_selected_shop}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Shops</SelectItem>
                {available_shops.map((shop) => (
                  <SelectItem
                    key={shop}
                    value={shop}
                  >
                    {shop}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selected_shop !== "all" && (
              <button
                onClick={() => set_selected_shop("all")}
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase dark:text-gray-300"
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">({filtered_items.length} total)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="rounded p-1 transition-colors hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-transparent dark:hover:bg-gray-700"
              aria-label="First page"
            >
              <ChevronsLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="rounded p-1 transition-colors hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-transparent dark:hover:bg-gray-700"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="rounded p-1 transition-colors hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-transparent dark:hover:bg-gray-700"
              aria-label="Next page"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="rounded p-1 transition-colors hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-transparent dark:hover:bg-gray-700"
              aria-label="Last page"
            >
              <ChevronsRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function calculate_available_shops(cart_items: Shopping_Cart_Item[]) {
  const shops = new Set(cart_items.map((item) => item.ShopName).filter((shop) => shop && shop.trim() !== ""));
  return Array.from(shops).sort();
}

function apply_shop_filter(cart_items: Shopping_Cart_Item[], selected_shop: string) {
  if (selected_shop === "all") {
    return cart_items;
  }
  return cart_items.filter((item) => item.ShopName === selected_shop);
}
