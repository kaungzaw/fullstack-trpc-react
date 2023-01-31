import { z } from "zod";
import { router, publicProcedure } from "../../trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userRouter = router({
  getAllUsers: publicProcedure.query(async () => {
    const data = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return data;
  }),
  getUserById: publicProcedure.input(z.string()).query(async ({ input }) => {
    const data = await prisma.user.findUnique({
      where: { id: input },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return data;
  }),
});
