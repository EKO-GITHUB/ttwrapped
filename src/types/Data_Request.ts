export type Data_Request_Status = "pending" | "downloading" | "expired" | "cancelled" | "none";

export type Data_Request_Metadata = {
  request_id: string | null;
  status: Data_Request_Status;
  requested_at: string | null;
  ready_at: string | null;
};
