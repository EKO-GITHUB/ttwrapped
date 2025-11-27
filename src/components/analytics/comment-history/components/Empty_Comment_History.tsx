import { MessageSquare } from "lucide-react";
import Data_Section_Card from "@/components/layout/Data_Section_Card";
import Empty_State from "@/components/custom/Empty_State";

export default function Empty_Comment_History() {
  return (
    <Data_Section_Card
      value="comment-history"
      title="Comment History"
      icon={<MessageSquare className="h-6 w-6" />}
    >
      <Empty_State
        message="Comment History Error"
        description="There is an issue with parsing the data in 'Comment' in your user_data_tiktok.json"
        highlighted_section="Comment"
      />
    </Data_Section_Card>
  );
}
