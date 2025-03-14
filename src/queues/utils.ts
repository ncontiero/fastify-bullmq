import {
  type Processor,
  type QueueOptions,
  type WorkerOptions,
  Queue,
  Worker,
} from "bullmq";
import { createQueueOpts, createWorkerOpts } from "./configs";

export const createQueue = <T>(name: string, opts?: QueueOptions) =>
  new Queue<T>(name, createQueueOpts(opts));

export const createWorker = <T>(
  name: string,
  processor: Processor<T>,
  opts?: WorkerOptions,
) => new Worker<T>(name, processor, createWorkerOpts(opts));
