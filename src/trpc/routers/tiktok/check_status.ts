import { TRPCError } from "@trpc/server";
import { protected_procedure } from "../../init";
import { get_tiktok_token, get_data_request_metadata, set_data_request_metadata, TIKTOK_DATA_API_URL } from "./helpers";
import type { Data_Request_Metadata, Data_Request_Status } from "@/types/Data_Request";

export const check_status = protected_procedure.query(async ({ ctx }): Promise<Data_Request_Metadata> => {
  const metadata = await get_data_request_metadata(ctx.userId);

  if (!metadata?.request_id) {
    return { request_id: null, status: "none", requested_at: null, ready_at: null };
  }

  const token = await get_tiktok_token(ctx.userId);

  const response = await fetch(`${TIKTOK_DATA_API_URL}/check/?fields=request_id,status`, {
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
      message: data.error?.message || "Failed to check status",
    });
  }

  const tiktok_status = data.data.status as string;
  let new_status: Data_Request_Status = metadata.status;
  let ready_at = metadata.ready_at;

  if (tiktok_status === "downloading" && metadata.status !== "downloading") {
    new_status = "downloading";
    ready_at = new Date().toISOString();
  } else if (tiktok_status === "expired") {
    new_status = "expired";
  } else if (tiktok_status === "cancelled") {
    new_status = "cancelled";
  } else if (tiktok_status === "pending") {
    new_status = "pending";
  }

  const updated_metadata: Data_Request_Metadata = {
    ...metadata,
    status: new_status,
    ready_at,
  };

  if (new_status !== metadata.status) {
    await set_data_request_metadata(ctx.userId, updated_metadata);
  }

  return updated_metadata;
});
