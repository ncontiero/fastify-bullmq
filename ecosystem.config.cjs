module.exports = {
  apps: [
    {
      name: "worker",
      cwd: "./dist",
      script: "./worker.js",
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
      env_production: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
    },
  ],
};
