import React from "react";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

type Icon_Section_Props = {
  icon: React.ReactNode;
  title: string;
  bg_color: string;
  icon_color: string;
  children: React.ReactNode;
  value: string;
};

export default function Icon_Section({ icon, title, bg_color, icon_color, children, value }: Icon_Section_Props) {
  return (
    <AccordionItem
      value={value}
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
    >
      <AccordionTrigger className="p-6 hover:bg-gray-50 hover:no-underline dark:hover:bg-gray-800">
        <div className="flex items-center gap-4">
          <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg ${bg_color}`}>
            <div className={icon_color}>{icon}</div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
        </div>
      </AccordionTrigger>
      <AccordionContent className="border-t border-gray-200 p-6 dark:border-gray-800">{children}</AccordionContent>
    </AccordionItem>
  );
}
