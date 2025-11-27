import { Lock, Shield } from "lucide-react";
import Data_Section_Card from "@/components/layout/Data_Section_Card";
import Analytics_Section from "./components/Analytics_Section";
import Login_Table from "./components/Login_Table";
import Empty_Login_History from "./components/Empty_Login_History";
import Activity_Map from "@/components/custom/Activity_Map";
import { useData_store } from "@/stores/useData_store";

export default function Login_History() {
  const your_activity_is_valid = useData_store((state) => state.your_activity_is_valid);
  const your_activity = useData_store((state) => state.your_activity)!;

  if (!your_activity_is_valid) return <Empty_Login_History />;

  const login_history = your_activity["Login History"].LoginHistoryList;

  return (
    <Data_Section_Card
      value="login-history"
      title="Login History"
      description="Security and device login activity"
      icon={<Shield className="h-6 w-6" />}
    >
      <div className="grid w-full min-w-0 grid-cols-1 gap-4">
        <Analytics_Section login_history={login_history} />
        <h3 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100">
          <Lock className="h-4 w-4" /> Login History ({login_history.length.toLocaleString() ?? "0"})
        </h3>
        <Activity_Map
          data={login_history}
          date_field="Date"
          title="Login Activity"
          singular_label="login"
          plural_label="logins"
          color="green"
        />
        <Login_Table login_history={login_history} />
      </div>
    </Data_Section_Card>
  );
}
