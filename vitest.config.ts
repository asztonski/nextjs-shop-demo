// vitest.config.ts
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths"; // DX: resolve "@/..." from tsconfig paths

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.ts",
    include: ["__tests__/**/*.{test,spec}.{ts,tsx}"], // DX: standard test globs
    css: true, // DX: allow CSS imports in tested components
  },
});
