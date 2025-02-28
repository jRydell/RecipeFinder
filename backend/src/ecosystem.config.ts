// ecosystem.config.ts
export default {
  apps: [
    {
      name: "backend",
      script: "backend/dist/server.js",
      env: {
        DB_HOST: "83.252.101.28",
        DB_USER: "johan",
        DB_PASSWORD: "2xsRD3ah!",
        DB_NAME: "test_database",
        PORT: 5000,
      },
    },
  ],
};
