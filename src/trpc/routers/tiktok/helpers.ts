import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import type { Data_Request_Metadata } from "@/types/Data_Request";

export const TIKTOK_API_URL = "https://open.tiktokapis.com/v2/user/info/";
export const TIKTOK_FIELDS = "open_id,union_id,avatar_url,avatar_large_url,display_name";
export const TIKTOK_DATA_API_URL = "https://open.tiktokapis.com/v2/user/data";
export const FOUR_DAYS_MS = 4 * 24 * 60 * 60 * 1000;

export async function get_tiktok_token(user_id: string): Promise<string> {
  const client = await clerkClient();
  const tokens = await client.users.getUserOauthAccessToken(user_id, "tiktok");

  if (!tokens.data?.length) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "TikTok not connected" });
  }

  return tokens.data[0].token;
}

export async function get_data_request_metadata(user_id: string): Promise<Data_Request_Metadata | null> {
  const client = await clerkClient();
  const user = await client.users.getUser(user_id);
  return (user.privateMetadata?.tiktok_data_request as Data_Request_Metadata) || null;
}

export async function set_data_request_metadata(user_id: string, metadata: Data_Request_Metadata | null): Promise<void> {
  const client = await clerkClient();
  await client.users.updateUser(user_id, {
    privateMetadata: { tiktok_data_request: metadata },
  });
}
