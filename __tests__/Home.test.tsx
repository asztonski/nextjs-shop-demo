// __tests__/Home.test.tsx
import { render, screen } from "@testing-library/react";
import Home from "../app/page";
import RootLayout from "../app/layout";

describe("Home page", () => {
  it("renders header, main and footer landmarks", () => {
    render(
      <RootLayout>
        <Home />
      </RootLayout>
    );

    // <header> => role="banner"
    expect(screen.getByRole("banner")).toBeInTheDocument();

    // <main> => role="main"
    expect(screen.getByRole("main")).toBeInTheDocument();

    // <footer> => role="contentinfo"
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
