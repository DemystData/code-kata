import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: ["**/?(*.)+(spec|test).[tj]s?(x)"],
    exclude: ["**/node_modules/**"],
    setupFiles: ["./test/setup.ts"],
    root: "./",
    clearMocks: true,
    threads: true,
    testTimeout: 5000,
    mockReset: true,
  },
});
