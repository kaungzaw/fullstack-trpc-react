import { router } from "../utils/trpc";
import { authRouter } from "./auth";
import { userRouter } from "./user";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
