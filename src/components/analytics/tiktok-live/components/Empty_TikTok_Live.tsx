import { Video } from "lucide-react";
import Data_Section_Card from "@/components/layout/Data_Section_Card";
import Empty_State from "@/components/custom/Empty_State";

export default function Empty_TikTok_Live() {
  return (
    <Data_Section_Card
      value="tiktok-live"
      title="TikTok LIVE"
      icon={<Video className="h-6 w-6" />}
    >
      <Empty_State
        message="Live Watch History Error"
        description="There is an issue with parsing the data in 'Tiktok Live' in your user_data_tiktok.json"
        highlighted_section="Tiktok Live"
      />
    </Data_Section_Card>
  );
}
