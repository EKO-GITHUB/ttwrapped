import type { TikTok_User } from "@/types/TikTok_User";
import { clerkClient } from "@clerk/nextjs/server";
import { protected_procedure } from "../../init";
import { TIKTOK_API_URL, TIKTOK_FIELDS } from "./helpers";

export const get_user = protected_procedure.query(async ({ ctx }): Promise<TikTok_User> => {
  const client = await clerkClient();
  const tokens = await client.users.getUserOauthAccessToken(ctx.userId, "tiktok");

  if (!tokens.data?.length) {
    throw new Error("TikTok not connected");
  }

  const response = await fetch(`${TIKTOK_API_URL}?fields=${TIKTOK_FIELDS}`, {
    headers: { Authorization: `Bearer ${tokens.data[0].token}` },
  });

  const data = await response.json();
  if (data.error?.code !== "ok") {
    throw new Error(data.error?.message || "TikTok API error");
  }

  const tiktok_user = data.data.user as TikTok_User;

  const existing_users = await client.users.getUserList({
    externalId: [tiktok_user.union_id],
  });

  for (const user of existing_users.data) {
    if (user.id !== ctx.userId) {
      await client.users.deleteUser(user.id);
    }
  }

  await client.users.updateUser(ctx.userId, {
    externalId: tiktok_user.union_id,
    firstName: tiktok_user.display_name,
  });

  const avatar_response = await fetch(tiktok_user.avatar_url);
  const avatar_blob = await avatar_response.blob();
  await client.users.updateUserProfileImage(ctx.userId, {
    file: avatar_blob,
  });

  return tiktok_user;
});
