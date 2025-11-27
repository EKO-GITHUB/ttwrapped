"use client";

import { useMemo, useState } from "react";
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, History } from "lucide-react";
import { login_history_table_columns } from "./table-columns";
import Filter_Bar from "./Filter_Bar";
import { Login_History_Item } from "@/types/TikTok_Data_Schema";

export default function Login_Table({ login_history }: { login_history: Login_History_Item[] }) {
  const [selected_device, set_selected_device] = useState<string>("all");
  const [selected_network, set_selected_network] = useState<string>("all");

  const available_devices = useMemo(
    () => calculate_available_devices(login_history, selected_network),
    [login_history, selected_network],
  );

  const available_networks = useMemo(
    () => calculate_available_networks(login_history, selected_device),
    [login_history, selected_device],
  );

  const filtered_logins = useMemo(
    () => apply_filters(login_history, selected_device, selected_network),
    [login_history, selected_device, selected_network],
  );

  const has_active_filters = selected_device !== "all" || selected_network !== "all";

  const clear_all_filters = () => {
    set_selected_device("all");
    set_selected_network("all");
  };

  const columns = useMemo(() => login_history_table_columns, []);

  const table = useReactTable({
    data: filtered_logins,
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
    <div className="w-full min-w-0 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100">
          <History className="h-5 w-5" />
          Login Events
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            ({filtered_logins.length} of {login_history.length})
          </span>
        </h4>
      </div>

      <Filter_Bar
        selected_device={selected_device}
        selected_network={selected_network}
        available_devices={available_devices}
        available_networks={available_networks}
        on_device_change={set_selected_device}
        on_network_change={set_selected_network}
        on_clear_filters={clear_all_filters}
        has_active_filters={has_active_filters}
      />

      <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="max-w-full overflow-x-auto">
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
            <span className="text-sm text-gray-500 dark:text-gray-400">({filtered_logins.length} total)</span>
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

function calculate_available_devices(login_history: Login_History_Item[], selected_network: string) {
  const filtered_logins =
    selected_network === "all"
      ? login_history
      : login_history.filter((login) => login.NetworkType === selected_network);

  const devices = new Set(
    filtered_logins
      .map((login) => `${login.DeviceModel} (${login.DeviceSystem})`)
      .filter((device) => device && device.trim() !== " ()" && device.trim() !== ""),
  );
  return Array.from(devices).sort();
}

function calculate_available_networks(login_history: Login_History_Item[], selected_device: string) {
  const filtered_logins =
    selected_device === "all"
      ? login_history
      : login_history.filter((login) => `${login.DeviceModel} (${login.DeviceSystem})` === selected_device);

  const networks = new Set(
    filtered_logins.map((login) => login.NetworkType).filter((network) => network && network.trim() !== ""),
  );
  return Array.from(networks).sort();
}

function apply_filters(login_history: Login_History_Item[], selected_device: string, selected_network: string) {
  let filtered = login_history;

  if (selected_device !== "all") {
    filtered = filtered.filter((login) => `${login.DeviceModel} (${login.DeviceSystem})` === selected_device);
  }

  if (selected_network !== "all") {
    filtered = filtered.filter((login) => login.NetworkType === selected_network);
  }

  return filtered.sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime());
}
