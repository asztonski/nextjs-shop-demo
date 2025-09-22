import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("Home page", () => {
  it("renders a heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("link", { name: /read our docs/i })
    ).toBeInTheDocument();
  });
});
