import { sendEmailQueue } from "@/queues/email-queue";
import { myQueue } from "@/queues/my-queue";
import {
  STATS_QUEUE_NAME,
  STATS_SCHEDULER_ID,
  statsQueue,
} from "@/queues/stats-queue";
import { createWorker } from "@/queues/utils";

const queuesToReport = [myQueue, sendEmailQueue];

/**
 * This is a dummy worker set up to demonstrate Job Schedulers (recurring jobs).
 * It only reads the job counts of the other queues and logs them.
 *
 * In a real application, you could use a scheduler for reports,
 * syncs, cleanups or any other periodic task.
 */
export const statsWorker = createWorker(STATS_QUEUE_NAME, async (job) => {
  const stats: Record<string, Record<string, number>> = {};

  for (const queue of queuesToReport) {
    stats[queue.name] = await queue.getJobCounts(
      "waiting",
      "active",
      "completed",
      "failed",
      "delayed",
    );
    await job.log(`${queue.name}: ${JSON.stringify(stats[queue.name])}`);
  }

  return stats;
});

// Upserting is idempotent, so it is safe to run on every worker start,
// even with multiple instances.
export const scheduleStats = () =>
  statsQueue.upsertJobScheduler(
    STATS_SCHEDULER_ID,
    { pattern: "*/5 * * * *" }, // every 5 minutes
    { name: "report" },
  );

statsWorker.on("completed", (job) => {
  // eslint-disable-next-line no-console
  console.info(`Completed job ${job.id} - ${job.name}`);
});
statsWorker.on("failed", (job, err) => {
  console.error(`Failed job ${job?.id} - ${job?.name} with ${err}`);
});
statsWorker.on("error", (err) => {
  console.error(`Error ${err}`);
});
