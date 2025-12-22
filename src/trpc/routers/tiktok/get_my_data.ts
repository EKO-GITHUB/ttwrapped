import { clerkClient } from "@clerk/nextjs/server";
import { protected_procedure } from "../../init";

export const get_my_data = protected_procedure.query(async ({ ctx }) => {
  const client = await clerkClient();
  const user = await client.users.getUser(ctx.userId);

  return {
    profile: {
      external_id: user.externalId,
      display_name: user.firstName,
      profile_image_url: user.imageUrl,
      created_at: user.createdAt,
    },
    data_request: user.privateMetadata?.tiktok_data_request || null,
    exported_at: new Date().toISOString(),
  };
});
