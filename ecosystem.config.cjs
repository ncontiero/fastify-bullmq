module.exports = {
  apps: [
    {
      name: "worker",
      cwd: "./dist",
      script: "./worker.js",
      instances: process.env.WORKER_INSTANCES || 1,
      env_production: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
    },
    {
      name: "api",
      cwd: "./dist",
      script: "./server.js",
      instances: process.env.SERVER_INSTANCES || 1,
      env_production: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
    },
  ],
};
