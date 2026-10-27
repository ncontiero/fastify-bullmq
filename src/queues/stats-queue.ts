import { createQueue } from "./utils";

export const STATS_QUEUE_NAME = "stats-queue";
export const STATS_SCHEDULER_ID = "report-queue-stats";

export const statsQueue = createQueue(STATS_QUEUE_NAME);
