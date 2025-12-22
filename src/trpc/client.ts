import { createTRPCReact } from "@trpc/react-query";
import type { App_Router } from "./routers/_app";

export const trpc = createTRPCReact<App_Router>();
