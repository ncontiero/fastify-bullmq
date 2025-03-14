import { MY_QUEUE_NAME } from "@/queues/my-queue";
import { createWorker } from "@/queues/utils";

/**
 * This is a dummy worker set up to demonstrate job progress and to
 * randomly fail jobs to demonstrate the UI.
 *
 * In a real application, you would want to set up a worker that
 * actually does something useful.
 */
export const myWorker = createWorker(MY_QUEUE_NAME, async (job) => {
  // eslint-disable-next-line no-console
  console.log(`Processing job ${job.id}`);

  for (let i = 0; i <= 100; i++) {
    await job.updateProgress(i);
    await new Promise((resolve) => setTimeout(resolve, 50));
    await job.log(`Processing job at interval ${i}`);

    if (Math.random() * 200 < 1) throw new Error(`Random error ${i}`);
  }

  return { jobId: `This is the return value of job (${job.id})` };
});

// myWorker.on("progress", (job, progress) => {
//   // eslint-disable-next-line no-console
//   console.info(`Job ${job.id} - ${job.name} is ${progress}% complete`);
// });
myWorker.on("completed", (job) => {
  // eslint-disable-next-line no-console
  console.info(`Completed job ${job.id} - ${job.name}`);
});
myWorker.on("failed", (job, err) => {
  console.error(`Failed job ${job?.id} - ${job?.name} with ${err}`);
});
myWorker.on("error", (err) => {
  console.error(`Error ${err}`);
});
