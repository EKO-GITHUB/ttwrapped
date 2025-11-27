"use client";

import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MessageCircle, Filter } from "lucide-react";
import { messages_table_columns, Flat_Message } from "./Messages_Table_Columns";

export default function Messages_Table({ messages }: { messages: Flat_Message[] }) {
  const [selected_conversation, set_selected_conversation] = useState<string>("all");

  const unique_conversations = useMemo(() => {
    const conversations = new Set(messages.map((m) => m.conversation_with));
    return Array.from(conversations).sort();
  }, [messages]);

  const filtered_messages = useMemo(() => {
    if (selected_conversation === "all") return messages;
    return messages.filter((m) => m.conversation_with === selected_conversation);
  }, [messages, selected_conversation]);

  const columns = useMemo(() => messages_table_columns, []);

  const table = useReactTable({
    data: filtered_messages,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
      sorting: [
        {
          id: "date",
          desc: true,
        },
      ],
    },
  });

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex items-center justify-between">
        <h4 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100">
          <MessageCircle className="h-5 w-5" />
          Messages
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            ({filtered_messages.length}
            {selected_conversation !== "all" && ` of ${messages.length}`})
          </span>
        </h4>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <select
            value={selected_conversation}
            onChange={(e) => set_selected_conversation(e.target.value)}
            className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 transition-colors hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-500"
          >
            <option value="all">All Conversations</option>
            {unique_conversations.map((conversation) => (
              <option key={conversation} value={conversation}>
                {conversation}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full max-w-full min-w-max">
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
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({filtered_messages.length}
              {selected_conversation !== "all" && ` of ${messages.length}`} total)
            </span>
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
