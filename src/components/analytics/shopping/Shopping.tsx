import { FileQuestion, ShoppingBag, ShoppingCart } from "lucide-react";
import Empty_Shopping from "./components/Empty_Shopping";
import Analytics_Section from "./components/Analytics_Section";
import Browsing_Table from "./components/Browsing_Table";
import Cart_Table from "./components/Cart_Table";
import Data_Section_Card from "@/components/layout/Data_Section_Card";
import Activity_Map from "@/components/custom/Activity_Map";
import { useData_store } from "@/stores/useData_store";
import React from "react";

export default function Shopping() {
  const tiktok_shop_is_valid = useData_store((state) => state.tiktok_shop_is_valid);
  const tiktok_shop = useData_store((state) => state.tiktok_shop)!;

  if (!tiktok_shop_is_valid) {
    return <Empty_Shopping />;
  }

  const browsing_history =
    tiktok_shop["Product Browsing History"].ProductBrowsingHistories.sort(
      (a, b) => new Date(b.browsing_date).getTime() - new Date(a.browsing_date).getTime(),
    ) || [];
  const cart_items = tiktok_shop["Shopping Cart List"].ShoppingCart || [];

  if (browsing_history.length === 0 && cart_items.length === 0) {
    return <No_Data />;
  }

  return (
    <Data_Section_Card
      value="shopping"
      title="TikTok Shop"
      description="Your shopping activity and cart"
      icon={<ShoppingBag className="h-6 w-6" />}
    >
      <div className="grid w-full min-w-0 grid-cols-1 gap-4">
        <Analytics_Section
          browsing_history={browsing_history}
          cart_items={cart_items}
        />

        {browsing_history.length > 0 && (
          <>
            <h3 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100">
              <ShoppingCart className="h-4 w-4" /> Browsing History ({browsing_history.length.toLocaleString() ?? "0"})
            </h3>
            <Activity_Map
              data={browsing_history}
              date_field="browsing_date"
              title="Browsing Activity"
              singular_label="view"
              plural_label="views"
              color="purple"
            />
            <Browsing_Table browsing_history={browsing_history} />
          </>
        )}

        {cart_items.length > 0 && <Cart_Table cart_items={cart_items} />}
      </div>
    </Data_Section_Card>
  );
}

function No_Data() {
  return (
    <Data_Section_Card
      value="ad-tracking"
      title="Ads & Tracking"
      icon={<ShoppingBag className="h-6 w-6" />}
    >
      <div
        className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center dark:border-gray-700 dark:bg-gray-900/50`}
      >
        <div className="mb-4 text-gray-400 dark:text-gray-600">
          <FileQuestion className="h-12 w-12" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">{"No Data"}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{"There is no TikTok Shop data"}</p>
      </div>
    </Data_Section_Card>
  );
}
