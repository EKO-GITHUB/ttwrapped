import { TRPCError } from "@trpc/server";
import { protected_procedure } from "../../init";
import { get_tiktok_token, get_data_request_metadata, set_data_request_metadata, TIKTOK_DATA_API_URL } from "./helpers";

export const download_data = protected_procedure.mutation(async ({ ctx }): Promise<{ zip_base64: string }> => {
  const metadata = await get_data_request_metadata(ctx.userId);

  if (!metadata?.request_id || metadata.status !== "downloading") {
    throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Data is not ready for download" });
  }

  const token = await get_tiktok_token(ctx.userId);

  const response = await fetch(`${TIKTOK_DATA_API_URL}/download/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ request_id: Number(metadata.request_id) }),
  });

  if (!response.ok) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to download data from TikTok",
    });
  }

  const array_buffer = await response.arrayBuffer();
  const zip_base64 = Buffer.from(array_buffer).toString("base64");

  await set_data_request_metadata(ctx.userId, null);

  return { zip_base64 };
});
