import { defineConfig } from "@rslib/core";

export default defineConfig({
  source: {
    entry: {
      worker: "./src/worker/index.ts",
      server: "./src/index.ts",
    },
  },
  lib: [{ format: "esm", syntax: "es2022" }],
});
