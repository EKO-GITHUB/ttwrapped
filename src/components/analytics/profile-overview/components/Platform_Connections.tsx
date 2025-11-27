"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { useData_store } from "@/stores/useData_store";

export default function Platform_Connections() {
  const profile = useData_store((state) => state.profile)!;
  const platform_info = profile["Profile Info"].ProfileMap.PlatformInfo;

  if (!platform_info || platform_info.length === 0) return null;

  return (
    <div>
      <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
        <ExternalLink className="h-4 w-4" />
        Platform Connections
      </h4>
      <div className="space-y-3">
        {platform_info.map((platform, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
          >
            {platform["Profile Photo"] && (
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image
                  src={platform["Profile Photo"]}
                  alt={platform.Name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <div className="font-medium text-gray-900 dark:text-gray-100">{platform.Name}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{platform.Platform}</div>
              {platform.Description && (
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-500">{platform.Description}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
