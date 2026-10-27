import { sendEmailWorker } from "./email-worker";
import { myWorker } from "./my-worker";
import { scheduleStats, statsWorker } from "./stats-worker";

scheduleStats().catch((error) => {
  console.error(`Failed to schedule stats job: ${error}`);
});

const gracefulShutdown = async (signal: string) => {
  console.warn(`Received ${signal}, closing/reloading workers...`);
  await myWorker.close();
  await sendEmailWorker.close();
  await statsWorker.close();
  process.exit(0);
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
