import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const connectDatabase = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to database");
  } catch (error) {
    await prisma.$disconnect();
    console.log("Failed to connect to the database");
    throw error;
  }
};
