// vitest.setup.ts
import "@testing-library/jest-dom";
import { vi } from "vitest";

/**
 * Mock next/font/google used in Next.js apps.
 * Returns a simple object with `variable` so code like:
 *   const foo = Work_Sans({ variable: '--font-foo' })
 * still works in tests (foo.variable -> '--font-foo').
 */
vi.mock("next/font/google", () => {
  return {
    __esModule: true,
    Work_Sans: (opts?: any) => ({
      variable: opts?.variable ?? "--font-work-sans",
    }),
    Space_Mono: (opts?: any) => ({
      variable: opts?.variable ?? "--font-space-mono",
    }),
    // add other font exports you use, e.g. Inter, Geist, etc.
  };
});

/**
 * Mock global CSS imports so PostCSS/Tailwind processing isn't executed
 * inside the test environment. Vitest + JSDOM doesn't need the real CSS.
 *
 * We register a couple of common specifiers to cover different import styles:
 * - "app/globals.css" used as absolute-ish specifier
 * - "./app/globals.css" or "../app/globals.css" could be used by modules,
 *   so we mock them too (harmless if some are not used).
 */
vi.mock("app/globals.css", () => ({}));
vi.mock("./app/globals.css", () => ({}));
vi.mock("../app/globals.css", () => ({}));
