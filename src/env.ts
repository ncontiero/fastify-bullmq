import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),

    // Redis
    REDIS_HOST: z.string().default("localhost"),
    REDIS_PORT: z.coerce.number().default(6379),
    REDIS_USER: z.string().optional(),
    REDIS_PASSWORD: z.string().optional(),

    // Dashboard Server
    PORT: z.coerce.number().default(3000),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,

    // Redis
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_USER: process.env.REDIS_USER,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,

    // Dashboard Server
    PORT: process.env.PORT,
  },
  skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
