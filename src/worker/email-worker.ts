import { SEND_EMAIL_QUEUE_NAME } from "@/queues/email-queue";
import { type SendEmailSchema, sendEmailSchema } from "@/queues/schemas";
import { createWorker } from "@/queues/utils";

export const sendEmailWorker = createWorker<SendEmailSchema>(
  SEND_EMAIL_QUEUE_NAME,
  async (job) => {
    const { email, subject, text } = sendEmailSchema.parse(job.data);

    job.log(
      `Sending email to ${email} with subject ${subject} and text ${text}`,
    );

    await new Promise((resolve) => setTimeout(resolve, 5000));

    job.log(`Email sent to ${email} with subject ${subject} and text ${text}`);

    return { email, subject, text };
  },
);

sendEmailWorker.on("completed", (job) => {
  // eslint-disable-next-line no-console
  console.info(`Completed job ${job.id} - ${job.name}`);
});
sendEmailWorker.on("failed", (job, err) => {
  console.error(`Failed job ${job?.id} - ${job?.name} with ${err}`);
});
sendEmailWorker.on("error", (err) => {
  console.error(`Error ${err}`);
});
