import { User } from "lucide-react";
import Data_Section_Card from "@/components/layout/Data_Section_Card";
import Empty_State from "@/components/custom/Empty_State";

export default function Empty_Shopping() {
  return (
    <Data_Section_Card
      value="shopping"
      title="TikTok Shop"
      icon={<User className="h-6 w-6" />}
      badge={0}
    >
      <Empty_State
        message="TikTok Shop Error"
        description="There is an issue with parsing the data in 'TikTok Shop' in your user_data_tiktok.json"
        highlighted_section={"TikTok Shop"}
      />
    </Data_Section_Card>
  );
}
