import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { TokenPayload } from "../types";
import { inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
import { getTokenPayload } from "./jwt";

export const createContext = ({ req, res }: CreateExpressContextOptions) => {
  const { token } = req.cookies;
  return { token, res };
};

type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

const checkAuth = t.middleware(async ({ path, ctx, next }) => {
  if (!["auth.signIn", "auth.signUp"].includes(path)) {
    const token = ctx.token;
    if (!token) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    const payload = getTokenPayload(token) as TokenPayload | null;
    if (!payload) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    const { userId } = payload;
    return next({
      ctx: { userId },
    });
  }

  return next({
    ctx: { user: null },
  });
});

export const middleware = t.middleware;
export const router = t.router;
export const publicProcedure = t.procedure.use(checkAuth);
