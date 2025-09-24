// __tests__/Home.test.tsx
import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("Home page", () => {
  it("renders header navigation", () => {
    render(<Home />);
    expect(
      screen.getByRole("link", { name: /next shop/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /marketplace/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /rankings/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /connect a wallet/i })
    ).toBeInTheDocument();
  });
});
