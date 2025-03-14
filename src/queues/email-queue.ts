import type { SendEmailSchema } from "./schemas";
import { createQueue } from "./utils";

export const SEND_EMAIL_QUEUE_NAME = "send-email-queue";

export const sendEmailQueue = createQueue<SendEmailSchema>(
  SEND_EMAIL_QUEUE_NAME,
);
