import { ExternalLink } from "lucide-react";
import React from "react";

export default function Link_Button({
  href,
  children,
  className = "",
  show_icon = true,
}: {
  href: string;
  children?: React.ReactNode;
  className?: string;
  show_icon?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 ${className}`}
    >
      {children || "View on TikTok"}
      {show_icon && <ExternalLink className="h-3.5 w-3.5" />}
    </a>
  );
}
