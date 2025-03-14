# BullMQ with BullBoard

[![license mit](https://img.shields.io/badge/licence-MIT-6C47FF)](./LICENSE)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/0s3-xR?referralCode=7y-eBI)

## ✨ Features

- A queueing system with [BullMQ](https://docs.bullmq.io/) and Redis;
- A dashboard built with [bull-board](https://github.com/felixmosh/bull-board) and [Fastify](https://fastify.dev/);
- Run services through [pm2](https://pm2.keymetrics.io/).

## Install and run the project

### Global Dependencies

You need to have a main dependency installed:

- Node.js LTS v18 (or any higher version)

Do you use `nvm`? Then you can run `nvm install` in the project folder to install and use the most appropriate version of Node.js.

### Local Dependencies

So after getting the repository, don't forget to install the project's local dependencies:

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

- [DkStore](https://github.com/dkshs/dkstore)
- <https://github.com/railwayapp-templates/fastify-bullmq>

## License

This project is licensed under the **MIT** License - see the [LICENSE](./LICENSE) file for details
