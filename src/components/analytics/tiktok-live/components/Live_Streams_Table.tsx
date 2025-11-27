"use client";

import React, { useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Video } from "lucide-react";
import { live_streams_table_columns } from "./Live_Streams_Table_Columns";

export default function Live_Streams_Table({
  live_streams,
}: {
  live_streams: {
    stream_id: string;
    WatchTime: string;
    Link: string;
    Comments: Array<{
      CommentTime: string;
      CommentContent: string;
      RawTime: number;
    }>;
    Questions: null;
  }[];
}) {
  const columns = useMemo(() => live_streams_table_columns, []);

  const table = useReactTable({
    data: live_streams,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowCanExpand: (row) => row.original.Comments.length > 0,
    initialState: {
      pagination: {
        pageSize: 10,
      },
      sorting: [
        {
          id: "WatchTime",
          desc: true,
        },
      ],
    },
  });

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex items-center justify-between">
        <h4 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100">
          <Video className="h-5 w-5" />
          Live Streams Watched
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">({live_streams.length})</span>
        </h4>
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
                <React.Fragment key={row.id}>
                  <tr className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 py-3"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                  {row.getIsExpanded() && (
                    <tr key={`${row.id}-expanded`}>
                      <td
                        colSpan={row.getVisibleCells().length}
                        className="bg-gray-50 px-4 py-4 dark:bg-gray-800/30"
                      >
                        <div className="space-y-2">
                          <h5 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            Comments ({row.original.Comments.length})
                          </h5>
                          <div className="space-y-3">
                            {row.original.Comments.map((comment, idx) => {
                              const is_deleted =
                                comment.CommentTime === "1969-12-31 23:59:59" &&
                                comment.CommentContent === "" &&
                                comment.RawTime === -1;

                              if (is_deleted) {
                                return (
                                  <div
                                    key={idx}
                                    className="rounded-lg border border-orange-200 bg-orange-50 p-3 dark:border-orange-800/50 dark:bg-orange-900/20"
                                  >
                                    <div className="text-sm text-orange-800 italic dark:text-orange-200">
                                      Comment / Live View deleted. TikTok preserves this entry as a placeholder in your
                                      data export
                                    </div>
                                  </div>
                                );
                              }

                              return (
                                <div
                                  key={idx}
                                  className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900"
                                >
                                  <div className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                                    {new Date(comment.CommentTime).toLocaleString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </div>
                                  <div className="text-sm text-gray-900 dark:text-gray-100">
                                    {comment.CommentContent}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">({live_streams.length} total)</span>
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
