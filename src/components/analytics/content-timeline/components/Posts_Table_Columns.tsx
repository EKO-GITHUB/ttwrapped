import { ColumnDef } from "@tanstack/react-table";
import Date_Display from "@/components/custom/Date_Display";
import { Tooltip, Tooltip_Content, Tooltip_Trigger } from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Post_Item } from "@/types/TikTok_Data_Schema";
import { ExternalLink, ImageOff, MessageSquare, Repeat2, Split } from "lucide-react";

export const posts_table_columns: ColumnDef<Post_Item>[] = [
  {
    accessorKey: "CoverImage",
    header: "Preview",
    cell: ({ getValue }) => {
      const cover_image = getValue() as string;
      const has_image = cover_image && cover_image.trim() !== "";

      if (!has_image) {
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded bg-gray-100 dark:bg-gray-800">
            <ImageOff className="h-5 w-5 text-gray-400" />
          </div>
        );
      }

      return (
        <div className="relative h-12 w-12 overflow-hidden rounded">
          <img
            src={cover_image}
            alt="Video thumbnail"
            className="object-cover"
            sizes="48px"
          />
        </div>
      );
    },
  },
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
    accessorKey: "Title",
    header: "Caption",
    cell: ({ getValue }) => {
      const title = getValue() as string;
      const display_title = title && title.trim() !== "" ? title : null;
      const truncated =
        display_title && display_title.length > 50 ? display_title.substring(0, 50) + "..." : display_title;

      if (!display_title) {
        return <span className="text-sm text-gray-400 italic">Untitled</span>;
      }

      return (
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <Tooltip_Trigger asChild>
              <div className="max-w-[300px] cursor-help">
                <span className="text-sm text-gray-900 dark:text-gray-100">{truncated}</span>
              </div>
            </Tooltip_Trigger>
            <Tooltip_Content className="max-w-sm">
              <p className="whitespace-pre-wrap">{display_title}</p>
            </Tooltip_Content>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "Likes",
    header: "Likes",
    cell: ({ getValue }) => {
      const likes_string = getValue() as string;
      const likes = parseInt(likes_string, 10) || 0;

      let badge_color = "bg-gray-100 text-gray-700 dark:bg-gray-800/50 dark:text-gray-300";
      if (likes >= 100) {
        badge_color = "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
      } else if (likes >= 10) {
        badge_color = "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      }

      return (
        <span className={`inline-block rounded px-2 py-1 text-xs font-medium ${badge_color}`}>
          {likes.toLocaleString()}
        </span>
      );
    },
  },
  {
    accessorKey: "WhoCanView",
    header: "Privacy",
    cell: ({ getValue }) => {
      const privacy = getValue() as string;

      let badge_color = "bg-gray-100 text-gray-700 dark:bg-gray-800/50 dark:text-gray-300";
      if (privacy.toLowerCase() === "public") {
        badge_color = "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      } else if (privacy.toLowerCase().includes("friend")) {
        badge_color = "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      } else if (privacy.toLowerCase().includes("private")) {
        badge_color = "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
      }

      return <span className={`inline-block rounded px-2 py-1 text-xs font-medium ${badge_color}`}>{privacy}</span>;
    },
  },
  {
    id: "engagement",
    header: "Engagement",
    cell: ({ row }) => {
      const allow_comments = row.original.AllowComments.toLowerCase() === "yes" || row.original.AllowComments === "1";
      const allow_duets = row.original.AllowDuets.toLowerCase() === "yes" || row.original.AllowDuets === "1";
      const allow_stitches = row.original.AllowStitches.toLowerCase() === "yes" || row.original.AllowStitches === "1";

      const enabled_count = [allow_comments, allow_duets, allow_stitches].filter(Boolean).length;

      return (
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <Tooltip_Trigger asChild>
              <div className="flex cursor-help items-center gap-1.5">
                <MessageSquare
                  className={`h-3.5 w-3.5 ${allow_comments ? "text-blue-600 dark:text-blue-400" : "text-gray-300 dark:text-gray-600"}`}
                />
                <Repeat2
                  className={`h-3.5 w-3.5 ${allow_duets ? "text-blue-600 dark:text-blue-400" : "text-gray-300 dark:text-gray-600"}`}
                />
                <Split
                  className={`h-3.5 w-3.5 ${allow_stitches ? "text-blue-600 dark:text-blue-400" : "text-gray-300 dark:text-gray-600"}`}
                />
              </div>
            </Tooltip_Trigger>
            <Tooltip_Content>
              <div className="space-y-1">
                <p className="font-semibold">{enabled_count} of 3 enabled</p>
                <p>Comments: {allow_comments ? "✓" : "✗"}</p>
                <p>Duets: {allow_duets ? "✓" : "✗"}</p>
                <p>Stitches: {allow_stitches ? "✓" : "✗"}</p>
              </div>
            </Tooltip_Content>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "Sound",
    header: "Sound",
    cell: ({ getValue }) => {
      const sound = getValue() as string;
      const display_sound = sound && sound.trim() !== "" ? sound : null;
      const truncated =
        display_sound && display_sound.length > 30 ? display_sound.substring(0, 30) + "..." : display_sound;

      if (!display_sound) {
        return <span className="text-xs text-gray-400 italic">No sound</span>;
      }

      return (
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <Tooltip_Trigger asChild>
              <div className="max-w-[200px] cursor-help">
                <span className="text-xs text-gray-600 dark:text-gray-400">{truncated}</span>
              </div>
            </Tooltip_Trigger>
            <Tooltip_Content className="max-w-sm">
              <p>{display_sound}</p>
            </Tooltip_Content>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "Location",
    header: "Location",
    cell: ({ getValue }) => {
      const location = getValue() as string;
      const display_location = location && location.trim() !== "" ? location : null;

      if (!display_location) {
        return <span className="text-xs text-gray-400 italic">No location</span>;
      }

      return (
        <span className="rounded bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
          {display_location}
        </span>
      );
    },
  },
  {
    accessorKey: "Link",
    header: "Link",
    cell: ({ getValue }) => {
      const link = getValue() as string;
      const has_link = link && link.trim() !== "";

      if (!has_link) {
        return <span className="text-xs text-gray-400 italic">No link</span>;
      }

      return (
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <Tooltip_Trigger asChild>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>View</span>
              </a>
            </Tooltip_Trigger>
            <Tooltip_Content>
              <p>Open on TikTok</p>
            </Tooltip_Content>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
];
