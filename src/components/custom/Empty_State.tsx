import { FileQuestion } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

export default function Empty_State({
  message = "No data available",
  description,
  icon,
  className = "",
  highlighted_section,
}: {
  message?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  highlighted_section:
    | "Ads and data"
    | "App Settings"
    | "Comment"
    | "Direct Message"
    | "Income Plus Wallet Transactions"
    | "Location Review"
    | "Post"
    | "Profile"
    | "TikTok Shop"
    | "Tiktok Live"
    | "Your Activity";
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center dark:border-gray-700 dark:bg-gray-900/50 ${className}`}
    >
      <div className="mb-4 text-gray-400 dark:text-gray-600">{icon || <FileQuestion className="h-12 w-12" />}</div>
      <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">{message}</h3>
      {description && <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>}
      <div className={"grid w-max max-w-full min-w-0 justify-start overflow-x-auto text-start text-xs"}>
        <p className="text-gray-500 dark:text-gray-400">{"{"}</p>
        <p>
          <span className={cn("ml-4", highlighted_section == "Ads and data" ? "text-red-600" : "text-black")}>
            {'    "Ads and data": {...}'}
          </span>
        </p>
        <p>
          <span className={cn("ml-4", highlighted_section == "App Settings" ? "text-red-600" : "text-black")}>
            {'    "App Settings": {...}'}
          </span>
        </p>
        <p>
          <span className={cn("ml-4", highlighted_section == "Comment" ? "text-red-600" : "text-black")}>
            {'    "Comment": {...}'}
          </span>
        </p>
        <p>
          <span className={cn("ml-4", highlighted_section == "Direct Message" ? "text-red-600" : "text-black")}>
            {'    "Direct Message": {...}'}
          </span>
        </p>
        <p>
          <span
            className={cn(
              "ml-4",
              highlighted_section == "Income Plus Wallet Transactions" ? "text-red-600" : "text-black",
            )}
          >
            {'    "Income Plus Wallet Transactions": {...}'}
          </span>
        </p>
        <p>
          <span className={cn("ml-4", highlighted_section == "Location Review" ? "text-red-600" : "text-black")}>
            {'    "Location Review": {...}'}
          </span>
        </p>
        <p>
          <span className={cn("ml-4", highlighted_section == "Post" ? "text-red-600" : "text-black")}>
            {'    "Post": {...}'}
          </span>
        </p>
        <p>
          <span className={cn("ml-4", highlighted_section == "Profile" ? "text-red-600" : "text-black")}>
            {'    "Profile": {...}'}
          </span>
        </p>
        <p>
          <span className={cn("ml-4", highlighted_section == "TikTok Shop" ? "text-red-600" : "text-black")}>
            {'    "TikTok Shop": {...}'}
          </span>
        </p>
        <p>
          <span className={cn("ml-4", highlighted_section == "Tiktok Live" ? "text-red-600" : "text-black")}>
            {'    "Tiktok Live": {...}'}
          </span>
        </p>
        <p>
          <span className={cn("ml-4", highlighted_section == "Your Activity" ? "text-red-600" : "text-black")}>
            {'    "Your Activity": {...}'}
          </span>
        </p>
        <p className="text-gray-500 dark:text-gray-400">{"}"}</p>
      </div>
    </div>
  );
}
