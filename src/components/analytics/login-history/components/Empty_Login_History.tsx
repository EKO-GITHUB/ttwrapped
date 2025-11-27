import { Shield } from "lucide-react";
import Data_Section_Card from "@/components/layout/Data_Section_Card";
import Empty_State from "@/components/custom/Empty_State";

export default function Empty_Login_History() {
  return (
    <Data_Section_Card
      value="login-history"
      title="Login History"
      icon={<Shield className="h-6 w-6" />}
    >
      <Empty_State
        message="Your Activity Error"
        description="There is an issue with parsing the data in 'Your Activity' in your user_data_tiktok.json"
        highlighted_section={"Your Activity"}
      />
    </Data_Section_Card>
  );
}
