"use client";

import { useMemo } from "react";
import { Product_Browsing_History_Item, Shopping_Cart_Item } from "@/types/TikTok_Data_Schema";

export default function Analytics_Section({
  browsing_history,
  cart_items,
}: {
  browsing_history: Product_Browsing_History_Item[];
  cart_items: Shopping_Cart_Item[];
}) {
  const analytics = useMemo(() => {
    const browsing_stats = calculate_browsing_stats(browsing_history);
    const cart_stats = calculate_cart_stats(cart_items);
    const top_browsed_shop = calculate_top_shop(browsing_history, "browsing");
    const top_cart_shop = calculate_top_shop(cart_items, "cart");
    const browsing_by_day = group_browsing_by_day(browsing_history);
    const avg_browsing_per_day = calculate_avg_per_day(browsing_by_day);
    const peak_browsing_day = calculate_peak_day(browsing_by_day);

    return {
      ...browsing_stats,
      ...cart_stats,
      top_browsed_shop,
      top_cart_shop,
      avg_browsing_per_day,
      peak_browsing_day,
    };
  }, [browsing_history, cart_items]);

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
      <h3 className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Shopping Analytics</h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        <Metric
          label="Products Browsed"
          value={analytics.total_browsed}
        />
        <Metric
          label="Unique Shops Browsed"
          value={analytics.unique_shops_browsed}
        />
        <Metric
          label="Top Browsed Shop"
          value={analytics.top_browsed_shop}
        />
        <Metric
          label="Avg. Browsing/Day"
          value={analytics.avg_browsing_per_day}
        />
        <Metric
          label="Peak Browsing Day"
          value={analytics.peak_browsing_day}
        />
        <Metric
          label="Cart Items"
          value={analytics.total_cart_items}
        />
        <Metric
          label="Total Quantity in Cart"
          value={analytics.total_quantity}
        />
        <Metric
          label="Unique Shops in Cart"
          value={analytics.unique_shops_in_cart}
        />
        <Metric
          label="Top Cart Shop"
          value={analytics.top_cart_shop}
        />
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">{value}</span>
    </div>
  );
}

function calculate_browsing_stats(browsing_history: Product_Browsing_History_Item[]) {
  const unique_shops = new Set(browsing_history.map((item) => item.shop_name).filter(Boolean));
  return {
    total_browsed: browsing_history.length,
    unique_shops_browsed: unique_shops.size,
  };
}

function calculate_cart_stats(cart_items: Shopping_Cart_Item[]) {
  const unique_shops = new Set(cart_items.map((item) => item.ShopName).filter(Boolean));
  const total_quantity = cart_items.reduce((sum, item) => sum + item.SkuCount, 0);
  return {
    total_cart_items: cart_items.length,
    unique_shops_in_cart: unique_shops.size,
    total_quantity,
  };
}

function calculate_top_shop(items: Product_Browsing_History_Item[] | Shopping_Cart_Item[], type: "browsing" | "cart") {
  const shop_counts = new Map<string, number>();

  items.forEach((item) => {
    const shop =
      type === "browsing" ? (item as Product_Browsing_History_Item).shop_name : (item as Shopping_Cart_Item).ShopName;
    if (shop && shop.trim() !== "") {
      shop_counts.set(shop, (shop_counts.get(shop) || 0) + 1);
    }
  });

  if (shop_counts.size === 0) return "N/A";

  const top_shop = Array.from(shop_counts.entries()).sort((a, b) => b[1] - a[1])[0];
  return `${top_shop[0]} (${top_shop[1]})`;
}

function group_browsing_by_day(browsing_history: Product_Browsing_History_Item[]) {
  const by_day = new Map<string, number>();
  browsing_history.forEach((item) => {
    const date = new Date(item.browsing_date);
    const day_key = date.toISOString().split("T")[0];
    by_day.set(day_key, (by_day.get(day_key) || 0) + 1);
  });
  return by_day;
}

function calculate_avg_per_day(by_day: Map<string, number>) {
  if (by_day.size === 0) return "0";
  const total = Array.from(by_day.values()).reduce((sum, count) => sum + count, 0);
  const avg = total / by_day.size;
  return avg.toFixed(1);
}

function calculate_peak_day(by_day: Map<string, number>) {
  if (by_day.size === 0) return "N/A";
  const peak = Array.from(by_day.entries()).sort((a, b) => b[1] - a[1])[0];
  const date = new Date(peak[0]);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
