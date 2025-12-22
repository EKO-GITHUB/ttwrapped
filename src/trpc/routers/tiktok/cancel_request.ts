import { TRPCError } from "@trpc/server";
import { protected_procedure } from "../../init";
import { get_tiktok_token, get_data_request_metadata, set_data_request_metadata, TIKTOK_DATA_API_URL } from "./helpers";

export const cancel_request = protected_procedure.mutation(async ({ ctx }): Promise<{ success: boolean }> => {
  const metadata = await get_data_request_metadata(ctx.userId);

  if (!metadata?.request_id) {
    throw new TRPCError({ code: "NOT_FOUND", message: "No active data request" });
  }

  const token = await get_tiktok_token(ctx.userId);

  const response = await fetch(`${TIKTOK_DATA_API_URL}/cancel/?fields=request_id`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ request_id: Number(metadata.request_id) }),
  });

  const data = await response.json();

  if (data.error?.code !== "ok") {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: data.error?.message || "Failed to cancel request",
    });
  }

  await set_data_request_metadata(ctx.userId, null);

  return { success: true };
});
