import { router } from "../init";
import { tiktok_router } from "./tiktok/router";

export const app_router = router({
  tiktok: tiktok_router,
});

export type App_Router = typeof app_router;
