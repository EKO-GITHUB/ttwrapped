import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { app_router } from "@/trpc/routers/_app";
import { create_context } from "@/trpc/init";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: app_router,
    createContext: create_context,
  });

export { handler as GET, handler as POST };
