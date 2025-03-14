import type {
  ConnectionOptions,
  DefaultJobOptions,
  QueueOptions,
  WorkerOptions,
} from "bullmq";
import { env } from "@/env";

export const connection: ConnectionOptions = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  username: env.REDIS_USER,
  password: env.REDIS_PASSWORD,
  family: 0, // 4 (IPv4) or 6 (IPv6)
};

export const createJobOptions = (
  opts?: DefaultJobOptions,
): DefaultJobOptions => {
  return {
    attempts: env.NODE_ENV === "production" ? 3 : 1,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
    ...opts,
  };
};
export const defaultJobOptions = createJobOptions();

export const createQueueOpts = (
  opts?: Omit<QueueOptions, "connection">,
): QueueOptions => {
  return {
    defaultJobOptions,
    ...opts,
    connection,
  };
};
export const defaultQueueOpts = createQueueOpts();

export const createWorkerOpts = (
  opts?: Omit<WorkerOptions, "connection">,
): WorkerOptions => {
  return {
    concurrency: 10,
    ...opts,
    connection,
  };
};
export const defaultWorkerOpts = createWorkerOpts();
