import { FileVideo } from "lucide-react";
import Data_Section_Card from "@/components/layout/Data_Section_Card";
import Empty_State from "@/components/custom/Empty_State";

export default function Empty_Content_Timeline() {
  return (
    <Data_Section_Card
      value="content-timeline"
      title="Content Timeline"
      icon={<FileVideo className="h-6 w-6" />}
    >
      <Empty_State
        message="Content Timeline Error"
        description="There is an issue with parsing the data in 'Post' in your user_data_tiktok.json"
        highlighted_section="Post"
      />
    </Data_Section_Card>
  );
}
