import { z } from "zod";

export const sendEmailSchema = z.object({
  email: z.string().email(),
  subject: z.string(),
  text: z.string(),
});
export type SendEmailSchema = z.infer<typeof sendEmailSchema>;
