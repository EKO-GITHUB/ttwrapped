"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ExternalLink, Heart, Star } from "lucide-react";

type Enhanced_Watch_History_Item = {
  Date: string;
  Link: string;
  is_liked: boolean;
  is_favorited: boolean;
};

export function create_watch_history_columns(): ColumnDef<Enhanced_Watch_History_Item>[] {
  return [
    {
      accessorKey: "Date",
      header: "Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("Date"));
        return (
          <span className="whitespace-nowrap">
            {date.toLocaleDateString()} {date.toLocaleTimeString()}
          </span>
        );
      },
    },
    {
      accessorKey: "Link",
      header: "Video",
      cell: ({ row }) => {
        const link = row.getValue("Link") as string;
        return (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:underline dark:text-blue-400"
          >
            View Video <ExternalLink className="h-3 w-3" />
          </a>
        );
      },
    },
    {
      id: "status",
      header: "",
      cell: ({ row }) => {
        const is_liked = row.original.is_liked;
        const is_favorited = row.original.is_favorited;

        if (!is_liked && !is_favorited) return null;

        return (
          <div className="flex items-center gap-1">
            {is_liked && (
              <span title="Liked">
                <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              </span>
            )}
            {is_favorited && (
              <span title="Favorited">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              </span>
            )}
          </div>
        );
      },
    },
  ];
}

export const favorite_videos_columns: ColumnDef<any>[] = [
  {
    accessorKey: "Date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("Date"));
      return (
        <span className="whitespace-nowrap">
          {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </span>
      );
    },
  },
  {
    accessorKey: "Link",
    header: "Video",
    cell: ({ row }) => {
      const link = row.getValue("Link") as string;
      return (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-blue-600 hover:underline dark:text-blue-400"
        >
          View Video <ExternalLink className="h-3 w-3" />
        </a>
      );
    },
  },
];

// Likes
export const likes_columns: ColumnDef<any>[] = [
  {
    accessorKey: "date", // Note: Schema might use 'date' or 'Date' depending on the specific list
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return (
        <span className="whitespace-nowrap">
          {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </span>
      );
    },
  },
  {
    accessorKey: "link",
    header: "Video",
    cell: ({ row }) => {
      const link = row.getValue("link") as string;
      return (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-blue-600 hover:underline dark:text-blue-400"
        >
          View Video <ExternalLink className="h-3 w-3" />
        </a>
      );
    },
  },
];

// Shares
export const shares_columns: ColumnDef<any>[] = [
  {
    accessorKey: "Date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("Date"));
      return (
        <span className="whitespace-nowrap">
          {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </span>
      );
    },
  },
  {
    accessorKey: "SharedContent",
    header: "Type",
    cell: ({ row }) => {
      const content = row.getValue("SharedContent") as string;
      return content === "video" ? "Video" : content;
    },
  },
  {
    accessorKey: "Method",
    header: "Method",
  },
  {
    accessorKey: "Link",
    header: "Link",
    cell: ({ row }) => {
      const link = row.getValue("Link") as string;
      return (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-blue-600 hover:underline dark:text-blue-400"
        >
          Open <ExternalLink className="h-3 w-3" />
        </a>
      );
    },
  },
];

// Searches
export const searches_columns: ColumnDef<any>[] = [
  {
    accessorKey: "Date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("Date"));
      return (
        <span className="whitespace-nowrap">
          {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </span>
      );
    },
  },
  {
    accessorKey: "SearchTerm",
    header: "Search Term",
    cell: ({ row }) => <span className="font-medium">{row.getValue("SearchTerm")}</span>,
  },
];

// Followers / Following
export const social_columns: ColumnDef<any>[] = [
  {
    accessorKey: "Date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("Date"));
      return (
        <span className="whitespace-nowrap">
          {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </span>
      );
    },
  },
  {
    accessorKey: "UserName",
    header: "Username",
    cell: ({ row }) => <span className="font-medium">@{row.getValue("UserName")}</span>,
  },
];
