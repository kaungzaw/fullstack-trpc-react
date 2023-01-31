import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { compare, hash } from "bcryptjs";
import { router, publicProcedure } from "../../trpc";
import { createToken } from "../../utils/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const expiresIn = Number(process.env.JWT_EXPIRES_IN) ?? 60 * 60 * 1000;

export const authRouter = router({
  signIn: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const { res } = ctx;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      if (!(await compare(password, user.password))) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const token = createToken({ userId: user.id });
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: expiresIn,
      });
      const expiresAt = Date.now() + expiresIn;
      return { userId: user.id, expiresAt: expiresAt.toString() };
    }),
  signUp: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z
          .string()
          .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
      })
    )
    .mutation(async ({ input }) => {
      const { name, email, password } = input;
      const user = await prisma.user.findUnique({ where: { email } });
      if (user) {
        throw new TRPCError({ code: "CONFLICT" });
      }
      const passwordHash = await hash(password, 4);
      await prisma.user.create({
        data: {
          name,
          email,
          password: passwordHash,
        },
      });
    }),
  signOut: publicProcedure.mutation(async ({ ctx }) => {
    const { res, userId } = ctx;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    const expires = new Date(Date.now() - 60 * 1000);
    res.cookie("token", "", { httpOnly: true, sameSite: "strict", expires });
  }),
  deleteAccount: publicProcedure.mutation(async ({ ctx }) => {
    const { res, userId } = ctx;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    await prisma.user.delete({ where: { id: userId } });
    const expires = new Date(Date.now() - 60 * 1000);
    res.cookie("token", "", { httpOnly: true, sameSite: "strict", expires });
  }),
});
