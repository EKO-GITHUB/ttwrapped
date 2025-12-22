import { router, protected_procedure } from "../init";
import { clerkClient } from "@clerk/nextjs/server";
import type { TikTok_User } from "@/types/TikTok_User";

const TIKTOK_API_URL = "https://open.tiktokapis.com/v2/user/info/";
const TIKTOK_FIELDS = "open_id,union_id,avatar_url,avatar_large_url,display_name";

export const tiktok_router = router({
  get_user: protected_procedure.query(async ({ ctx }): Promise<TikTok_User> => {
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

    // Sync TikTok data to Clerk user profile
    await client.users.updateUser(ctx.userId, {
      firstName: tiktok_user.display_name,
    });

    // Fetch TikTok avatar and update Clerk profile image
    const avatar_response = await fetch(tiktok_user.avatar_url);
    const avatar_blob = await avatar_response.blob();
    await client.users.updateUserProfileImage(ctx.userId, {
      file: avatar_blob,
    });

    return tiktok_user;
  }),
});
