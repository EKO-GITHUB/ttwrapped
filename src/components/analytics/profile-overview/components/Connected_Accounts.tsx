"use client";

import { ExternalLink, Instagram, Youtube } from "lucide-react";
import Link_Button from "@/components/custom/Link_Button";
import { useData_store } from "@/stores/useData_store";

export default function Connected_Accounts() {
  const profile = useData_store((state) => state.profile)!;
  const instagram_link = profile["Profile Info"].ProfileMap.instagramLink;
  const youtube_link = profile["Profile Info"].ProfileMap.youtubeLink;
  const lemon8_link = profile["Profile Info"].ProfileMap.lemon8Link;

  if (!instagram_link && !youtube_link && !lemon8_link) return null;

  return (
    <div>
      <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
        <ExternalLink className="h-4 w-4" />
        Connected Accounts
      </h4>
      <div className="flex flex-wrap gap-3">
        {instagram_link && (
          <Link_Button
            href={instagram_link}
            show_icon={false}
          >
            <Instagram className="mr-2 h-4 w-4" />
            Instagram
          </Link_Button>
        )}
        {youtube_link && (
          <Link_Button
            href={youtube_link}
            show_icon={false}
          >
            <Youtube className="mr-2 h-4 w-4" />
            YouTube
          </Link_Button>
        )}
        {lemon8_link && (
          <Link_Button
            href={lemon8_link}
            show_icon={false}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Lemon8
          </Link_Button>
        )}
      </div>
    </div>
  );
}
