import { protected_procedure } from "../../init";
import { get_data_request_metadata, set_data_request_metadata, FOUR_DAYS_MS } from "./helpers";
import type { Data_Request_Metadata } from "@/types/Data_Request";

export const get_request_state = protected_procedure.query(async ({ ctx }): Promise<Data_Request_Metadata> => {
  const metadata = await get_data_request_metadata(ctx.userId);

  if (!metadata) {
    return { request_id: null, status: "none", requested_at: null, ready_at: null };
  }

  if (metadata.status === "downloading" && metadata.ready_at) {
    const ready_timestamp = new Date(metadata.ready_at).getTime();
    if (Date.now() - ready_timestamp > FOUR_DAYS_MS) {
      await set_data_request_metadata(ctx.userId, null);
      return { request_id: null, status: "expired", requested_at: null, ready_at: null };
    }
  }

  return metadata;
});
