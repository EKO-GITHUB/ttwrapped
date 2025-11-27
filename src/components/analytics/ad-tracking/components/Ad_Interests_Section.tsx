import { Target } from "lucide-react";
import { AdInterests } from "@/types/TikTok_Data_Schema";

export default function Ad_Interests_Section({ ad_interests }: { ad_interests: AdInterests }) {
  if (!ad_interests || !ad_interests.AdInterestCategories) return <No_Ad_Interests_Section />;

  return (
    <div>
      <h4 className="mb-3 flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100">
        <Target className="h-5 w-5" />
        Ad Interest Categories
      </h4>
      <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
        {ad_interests.AdInterestCategories}
      </div>
    </div>
  );
}

function No_Ad_Interests_Section() {
  return (
    <div>
      <h4 className="mb-3 flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100">
        <Target className="h-5 w-5" />
        Ad Interest Categories
      </h4>
      <p className="text-sm text-gray-500 dark:text-gray-400">No ad interest categories found.</p>
    </div>
  );
}
