// __tests__/Products.test.tsx
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductsPage } from "@/app/products/page";
import products from "../data/products.json";

// Provide a request-like context for Next dynamic API used in the page
vi.mock("next/headers", () => ({
  // Return minimal headers used by getProducts()
  headers: () =>
    new Headers({
      host: "localhost:3000",
      "x-forwarded-proto": "http",
    }),
}));

// Ensure page data fetch resolves to our mock products
vi.spyOn(global, "fetch").mockResolvedValue(
  new Response(JSON.stringify(products), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }) as unknown as Response
);

afterEach(() => {
  vi.clearAllMocks();
});

describe("Products page", () => {
  it("renders the heading and at least one product", async () => {
    // RSC pages can be async; invoke to obtain JSX for render()
    const ui = await ProductsPage();
    render(ui);

    // Sanity check: accessible page heading
    expect(
      await screen.findByRole("heading", { name: /products/i })
    ).toBeInTheDocument();

    // Smoke check: at least one product is visible (by name or testid fallback)
    const firstName =
      Array.isArray(products) && products[0]?.name
        ? String(products[0].name)
        : null;

    if (firstName) {
      expect(screen.getByText(new RegExp(firstName, "i"))).toBeInTheDocument();
    } else {
      expect(screen.getAllByTestId("product-card").length).toBeGreaterThan(0);
    }
  });
});
