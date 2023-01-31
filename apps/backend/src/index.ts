import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { startServer } from "./server";

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();
  await startServer();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  });
