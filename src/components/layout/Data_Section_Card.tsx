"use client";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import React from "react";

export default function Data_Section_Card({
  title,
  description,
  icon,
  children,
  value,
  badge,
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  value: string;
  badge?: string | number;
}) {
  return (
    <AccordionItem
      value={value}
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
    >
      <AccordionTrigger className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50 hover:no-underline dark:hover:bg-gray-800/50">
        <div className="flex items-center gap-4">
          {icon && <div className="text-gray-600 dark:text-gray-400">{icon}</div>}
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
              {badge !== undefined && (
                <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                  {badge}
                </span>
              )}
            </div>
            {description && <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{description}</p>}
          </div>
        </div>
      </AccordionTrigger>

      <AccordionContent className="border-t border-gray-200 p-6 dark:border-gray-800">{children}</AccordionContent>
    </AccordionItem>
  );
}
