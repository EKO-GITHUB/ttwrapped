"use client";

import { UserX } from "lucide-react";
import Data_Section_Card from "@/components/layout/Data_Section_Card";
import Activity_Map from "@/components/custom/Activity_Map";
import { useData_store } from "@/stores/useData_store";
import Analytics_Section from "./components/Analytics_Section";
import Block_List_Table from "./components/Block_List_Table";
import Empty_Block_List from "./components/Empty_Block_List";

export default function Block_List() {
  const app_settings_is_valid = useData_store((state) => state.app_settings_is_valid);
  const app_settings = useData_store((state) => state.app_settings)!;

  if (!app_settings_is_valid) {
    return <Empty_Block_List />;
  }

  const blocked_users = app_settings["Block List"].BlockList.sort(
    (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime(),
  );

  if (blocked_users.length === 0) return <No_Blocked_Users />;

  return (
    <Data_Section_Card
      value="block-list"
      title="Block List"
      description="Users you've blocked and blocking activity patterns"
      icon={<UserX className="h-6 w-6" />}
      badge={blocked_users.length}
    >
      <div className="grid w-full min-w-0 grid-cols-1 gap-4">
        <Analytics_Section blocked_users={blocked_users} />

        <h3 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100">
          <UserX className="h-4 w-4" /> Blocking Activity
        </h3>

        <Activity_Map
          data={blocked_users}
          date_field="Date"
          title="Blocking Activity"
          singular_label="block"
          plural_label="blocks"
          color="red"
        />

        <Block_List_Table blocked_users={blocked_users} />
      </div>
    </Data_Section_Card>
  );
}

function No_Blocked_Users() {
  return (
    <Data_Section_Card
      value="block-list"
      title="Block List"
      description="Users you've blocked and blocking activity patterns"
      icon={<UserX className="h-6 w-6" />}
    >
      <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-8 text-center dark:border-gray-700 dark:bg-gray-800/50">
        <UserX className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">No blocked users</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          You haven't blocked any users, or they were not included in your TikTok data export.
        </p>
      </div>
    </Data_Section_Card>
  );
}
