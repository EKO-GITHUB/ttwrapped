import { TRPCError } from "@trpc/server";
import { protected_procedure } from "../../init";
import { get_tiktok_token, get_data_request_metadata, set_data_request_metadata, TIKTOK_DATA_API_URL } from "./helpers";
import type { Data_Request_Metadata } from "@/types/Data_Request";

export const request_data = protected_procedure.mutation(async ({ ctx }): Promise<{ request_id: string }> => {
  const existing = await get_data_request_metadata(ctx.userId);
  if (existing?.status === "pending") {
    throw new TRPCError({ code: "CONFLICT", message: "A data request is already pending" });
  }

  const token = await get_tiktok_token(ctx.userId);

  const response = await fetch(`${TIKTOK_DATA_API_URL}/add/?fields=request_id`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data_format: "json",
      category_selection_list: ["all_data"],
    }),
  });

  const data = await response.json();

  if (data.error?.code !== "ok") {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: data.error?.message || "Failed to request data from TikTok",
    });
  }

  const request_id = String(data.data.request_id);
  const metadata: Data_Request_Metadata = {
    request_id,
    status: "pending",
    requested_at: new Date().toISOString(),
    ready_at: null,
  };

  await set_data_request_metadata(ctx.userId, metadata);

  return { request_id };
});
