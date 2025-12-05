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
    Work_Sans: (opts?: Record<string, unknown>) => ({
      variable: opts?.variable ?? "--font-work-sans",
    }),
    Space_Mono: (opts?: Record<string, unknown>) => ({
      variable: opts?.variable ?? "--font-space-mono",
    }),
    // add other font exports you use, e.g. Inter, Geist, etc.
  };
});

/**
 * Mock next/navigation hooks used in Next.js App Router
 */
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  })),
  usePathname: vi.fn(() => "/"),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));

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
