import { router } from "../../init";
import { get_user } from "./get_user";
import { get_request_state } from "./get_request_state";
import { get_my_data } from "./get_my_data";
import { request_data } from "./request_data";
import { check_status } from "./check_status";
import { cancel_request } from "./cancel_request";
import { download_data } from "./download_data";

export const tiktok_router = router({
  get_user,
  get_request_state,
  get_my_data,
  request_data,
  check_status,
  cancel_request,
  download_data,
});
