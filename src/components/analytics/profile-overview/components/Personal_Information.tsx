"use client";

import { Calendar, Mail, Phone, User } from "lucide-react";
import { useData_store } from "@/stores/useData_store";
import Info_Item from "./Info_Item";

export default function Personal_Information() {
  const profile = useData_store((state) => state.profile)!;
  const birth_date = profile["Profile Info"].ProfileMap.birthDate;
  const email_address = profile["Profile Info"].ProfileMap.emailAddress;
  const telephone_number = profile["Profile Info"].ProfileMap.telephoneNumber;
  const inferred_gender = profile["Profile Info"].ProfileMap.inferredGender;

  const has_any_info =
    (birth_date && birth_date !== "None") ||
    (email_address && email_address !== "None") ||
    (telephone_number && telephone_number !== "None") ||
    (inferred_gender && inferred_gender !== "None");

  if (!has_any_info) return null;

  return (
    <div>
      <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
        <User className="h-4 w-4" />
        Personal Information
      </h4>
      <div className="grid gap-4 sm:grid-cols-2">
        {birth_date && birth_date !== "None" && (
          <Info_Item
            icon={<Calendar className="h-4 w-4" />}
            label="Birth Date"
            value={birth_date}
          />
        )}
        {email_address && email_address !== "None" && (
          <Info_Item
            icon={<Mail className="h-4 w-4" />}
            label="Email"
            value={email_address}
          />
        )}
        {telephone_number && telephone_number !== "None" && (
          <Info_Item
            icon={<Phone className="h-4 w-4" />}
            label="Phone"
            value={telephone_number}
          />
        )}
        {inferred_gender && inferred_gender !== "None" && (
          <Info_Item
            icon={<User className="h-4 w-4" />}
            label="Inferred Gender"
            value={inferred_gender}
          />
        )}
      </div>
    </div>
  );
}
