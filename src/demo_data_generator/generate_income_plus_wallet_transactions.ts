import { TikTok_Data } from "@/types/TikTok_Data_Schema";

export function generate_income_plus_wallet_transactions() {
  const income_plus_wallet_transactions: TikTok_Data["Income Plus Wallet Transactions"] = {
    "Transaction History": {
      TransactionsList: null,
    },
  };

  return income_plus_wallet_transactions;
}
