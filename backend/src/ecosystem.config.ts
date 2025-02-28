export default {
  apps: [
    {
      name: "backend",
      script: "./dist/server.js", // Make sure this points to the correct compiled file
      interpreter: "node", // Explicitly specify node as the interpreter
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
