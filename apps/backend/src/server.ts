import express from "express";
// import cors from "cors";
import cookieParser from "cookie-parser";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { createContext } from "./trpc";
import { appRouter } from "./routers/_app";

const app = express();
// app.use(cors());
app.use(cookieParser());

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

export const startServer = () => {
  const PORT = process.env.PORT;

  return new Promise<void>((resolve, reject) => {
    app
      .listen(PORT, () => {
        console.log(`Server started and listening on port ${PORT}`);
        resolve();
      })
      .on("error", (error) => {
        console.log("Failed to start the server.");
        return reject(error);
      });
  });
};
