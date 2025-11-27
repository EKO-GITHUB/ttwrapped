"use client";

import { User } from "lucide-react";
import Image from "next/image";
import { useData_store } from "@/stores/useData_store";

export default function AI_Profile() {
  const profile = useData_store((state) => state.profile)!;
  const ai_self = profile["Profile Info"].ProfileMap.aiSelf;

  if (!ai_self || ai_self === "None") return null;

  return (
    <div>
      <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
        <User className="h-4 w-4" />
        AI Generated Profile
      </h4>
      <div className="relative h-48 w-48 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        <Image
          src={ai_self}
          alt="AI Self"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
