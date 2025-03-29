# BullMQ with BullBoard

[![license mit](https://img.shields.io/badge/licence-MIT-6C47FF)](./LICENSE)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/0s3-xR?referralCode=7y-eBI)

## ✨ Features

- Queueing system with [BullMQ](https://docs.bullmq.io/) and Redis;
- Dashboard built with [bull-board](https://github.com/felixmosh/bull-board) and [Fastify](https://fastify.dev/);
- Run services through [pm2](https://pm2.keymetrics.io/).

## Explanations

This application uses **BullMQ**, a Redis-based queueing system, and **Bull-Board**, a dashboard to monitor and manage these queues, served by a **Fastify** server. Both services are built using [Rslib](https://lib.rsbuild.dev/) and managed by **PM2**.

There are three distinct ways to start the services:

1. **Unified Execution:** To start both services simultaneously, use the command `pnpm start`. This is the simplest option for local development.

2. **Separate Execution:** To start the worker and Fastify server individually, use the commands `pnpm start:worker` and `pnpm start:server`, respectively. This approach offers greater control and is used in the [Railway template](https://railway.com/template/0s3-xR?referralCode=7y-eBI), but can be easily adapted to your needs.

3. **Direct Node.js Execution:** For simple projects that do not require PM2 features, direct execution with Node.js can result in lower resource consumption. Use `node ./dist/worker.js` for the worker and `node ./dist/server.js` for the Fastify server.

PM2 also supports [Bun](https://bun.sh/). If desired, you can replace the project's package manager with Bun and execute the TypeScript files directly (Bun has native support for TypeScript), eliminating the need for a build. However, be aware that Bun is not fully compatible with Node.js, which may result in execution problems.

**Scalability (PM2):** Both services support horizontal scaling through the `WORKER_INSTANCES` and `SERVER_INSTANCES` environment variables. Set these variables to the desired number of instances to increase the processing capacity of the worker and server, respectively. **These variables will only take effect if PM2 is being used.**

## Install and run the project

### Global Dependencies

You need to have the following main dependency installed:

- Node.js LTS v18 (or any higher version)

Do you use `nvm`? Then you can run `nvm install` in the project folder to install and use the most appropriate version of Node.js.

### Local Dependencies

After cloning the repository, install the project's local dependencies:

```bash
pnpm install
```

### Environment variables

Create a `.env` file similar to [`.env.example`](./.env.example).

```env
# Redis
REDIS_HOST="localhost"
REDIS_PORT=6379
REDIS_USER=""
REDIS_PASSWORD=""
```

### Run the project

To run the project locally, just run the command below:

```bash
pnpm dev
```

- go to <http://127.0.0.1:3000/ui> to see the dashboard.

## References and inspirations

- <https://github.com/railwayapp-templates/fastify-bullmq>

## License

This project is licensed under the **MIT** License - see the [LICENSE](./LICENSE) file for details
