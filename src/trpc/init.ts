import { initTRPC, TRPCError } from "@trpc/server";
import { auth } from "@clerk/nextjs/server";

export const create_context = async () => {
  const { userId } = await auth();
  return { userId };
};

type Context = Awaited<ReturnType<typeof create_context>>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const public_procedure = t.procedure;
export const protected_procedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx: { userId: ctx.userId } });
});
