import { TikTok_Data } from "@/types/TikTok_Data_Schema";
import { faker } from "@faker-js/faker/locale/en";
import { format_timestamp } from "./format_timestamp";

export function generate_tiktok_shop() {
  const tiktok_shop: TikTok_Data["TikTok Shop"] = {
    "Communication With Shops": {
      CommunicationHistories: null,
    },
    "Current Payment Information": {
      PayCard: null,
    },
    "Customer Support History": {
      CustomerSupportHistories: null,
    },
    "Order Dispute History": {
      OrderDisputeHistories: null,
    },
    "Order History": {
      OrderHistories: null,
    },
    "Product Browsing History": {
      ProductBrowsingHistories: Array.from({ length: 100 }, () => ({
        browsing_date: format_timestamp(faker.date.past()),
        shop_name: faker.company.name(),
        product_name: faker.lorem.sentence(),
      })),
    },
    "Product Reviews": {
      ProductReviewHistories: null,
    },
    "Returns and Refunds History": {
      ReturnAndRefundHistories: null,
    },
    "Saved Address Information": {
      SavedAddress: null,
    },
    "Shopping Cart List": {
      ShoppingCart: Array.from({ length: 10 }, () => ({
        CreateTime: format_timestamp(faker.date.past()),
        SkuCount: faker.number.int({ min: 1, max: 10 }),
        ShopName: faker.company.name(),
        ProductName: faker.lorem.text(),
      })),
    },
    Vouchers: {
      Vouchers: null,
    },
  };

  return tiktok_shop;
}
