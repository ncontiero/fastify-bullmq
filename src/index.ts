import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter.js";
import { FastifyAdapter } from "@bull-board/fastify";
import Fastify from "fastify";
import { env } from "./env";
import { sendEmailQueue } from "./queues/email-queue";
import { myQueue } from "./queues/my-queue";

const fastify = Fastify({ logger: true });

const serverAdapter = new FastifyAdapter();

createBullBoard({
  queues: [new BullMQAdapter(myQueue), new BullMQAdapter(sendEmailQueue)],
  serverAdapter,
});

serverAdapter.setBasePath("/ui");
fastify.register(serverAdapter.registerPlugin(), {
  prefix: "/ui",
  basePath: "/ui",
});

const start = async () => {
  try {
    await fastify.listen({ port: env.PORT || 3000, host: "0.0.0.0" });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
