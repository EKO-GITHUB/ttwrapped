import { MessageCircle } from "lucide-react";
import Data_Section_Card from "@/components/layout/Data_Section_Card";
import Empty_State from "@/components/custom/Empty_State";

export default function Empty_Direct_Message() {
  return (
    <Data_Section_Card
      value="direct-message"
      title="Direct Messages"
      icon={<MessageCircle className="h-6 w-6" />}
    >
      <Empty_State
        message="Direct Message Error"
        description="There is an issue with parsing the data in 'Direct Message' in your user_data_tiktok.json"
        highlighted_section="Direct Message"
      />
    </Data_Section_Card>
  );
}
