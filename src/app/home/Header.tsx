"use client";

import Image from "next/image";
import React from "react";
import { useData_store } from "@/stores/useData_store";
import { Badge } from "@/components/ui/badge";

export default function Header() {
  const is_demo_mode = useData_store((state) => state.is_demo_mode);

  return (
    <div className="mb-6 text-center">
      <h1 className="mb-2 flex items-center justify-center justify-items-center gap-4 text-5xl font-bold text-gray-900 dark:text-gray-100">
        <Image
          src="/logo.svg"
          width={40}
          height={40}
          alt="ttwrapped logo"
        />
        TTWrapped
        {is_demo_mode && (
          <Badge
            variant="outline"
            className="ml-2 text-xs font-normal"
          >
            Demo
          </Badge>
        )}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        Upload your TikTok data export to view your complete analytics
      </p>
    </div>
  );
}
