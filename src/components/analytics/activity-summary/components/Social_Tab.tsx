import { social_columns } from "./table-columns";
import { Users } from "lucide-react";
import Stat_Card from "./Stat_Card";
import { Your_Activity } from "@/types/TikTok_Data_Schema";
import Activity_Table from "@/components/analytics/shared/Activity_Table";

export default function Social_Tab({ activity }: { activity: Your_Activity }) {
  const followers = activity.Follower.FansList;
  const following = activity.Following.Following;

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      <div className="grid gap-4 sm:grid-cols-2">
        <Stat_Card
          icon={<Users className="h-5 w-5" />}
          label="Followers"
          value={followers.length.toLocaleString()}
          color="teal"
        />
        <Stat_Card
          icon={<Users className="h-5 w-5" />}
          label="Following"
          value={following.length.toLocaleString()}
          color="cyan"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Activity_Table
          data={followers}
          columns={social_columns}
          title="Followers"
          icon={<Users className="h-5 w-5" />}
          searchable={true}
        />
        <Activity_Table
          data={following}
          columns={social_columns}
          title="Following"
          icon={<Users className="h-5 w-5" />}
          searchable={true}
        />
      </div>
    </div>
  );
}
