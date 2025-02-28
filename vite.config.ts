import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import tailwindcss from "@tailwindcss/vite";
import { reactRouter } from "@react-router/dev/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./app/_tests_/setup.ts",
    exclude: [...configDefaults.exclude, "node_modules/"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
