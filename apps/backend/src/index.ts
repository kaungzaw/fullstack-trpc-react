import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { startServer } from "./server";

const prisma = new PrismaClient();

// const main = async () => {
//   try {
//     await connectDatabase();
//     await startServer();
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

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
