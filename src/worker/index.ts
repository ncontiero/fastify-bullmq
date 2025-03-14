import { sendEmailWorker } from "./email-worker";
import { myWorker } from "./my-worker";

const gracefulShutdown = async (signal: string) => {
  console.warn(`Received ${signal}, closing/reloading workers...`);
  await myWorker.close();
  await sendEmailWorker.close();
  process.exit(0);
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
