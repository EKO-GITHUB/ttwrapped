import { UserX } from "lucide-react";
import Data_Section_Card from "@/components/layout/Data_Section_Card";
import Empty_State from "@/components/custom/Empty_State";

export default function Empty_Block_List() {
  return (
    <Data_Section_Card
      value="block-list"
      title="Block List"
      icon={<UserX className="h-6 w-6" />}
    >
      <Empty_State
        message="Block List Error"
        description="There is an issue with parsing the data in 'App Settings' in your user_data_tiktok.json"
        highlighted_section="App Settings"
      />
    </Data_Section_Card>
  );
}
