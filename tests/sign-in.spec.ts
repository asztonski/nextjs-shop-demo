import { test, expect } from "@playwright/test";

test.describe("Sign in page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/sign-in"); // Upewnij się, że ścieżka jest poprawna
  });
  test("should have a password input", async ({ page }) => {
    const passwordInput = await page.locator('input[type="password"]');
    await expect(passwordInput).toHaveCount(1);
  });

  test("should have a email input", async ({ page }) => {
    const emailInput = await page.locator('input[type="email"]');
    await expect(emailInput).toHaveCount(1);
  });

  test("should have a submit button", async ({ page }) => {
    const submitButton = await page.locator(
      'button[type="submit"], input[type="submit"]'
    );
    await expect(submitButton).toHaveCount(1);
  });

  test("submit button should be disabled if both inputs are empty", async ({
    page,
  }) => {
    const emailInput = await page.locator('input[type="email"]');
    const passwordInput = await page.locator('input[type="password"]');
    await emailInput.fill("");
    await passwordInput.fill("");
    const submitButton = await page.locator(
      'button[type="submit"], input[type="submit"]'
    );
    await expect(submitButton).toBeDisabled();
  });

  test("submit button should be enabled when inputs are filled", async ({
    page,
  }) => {
    await page.fill('input[type="email"]', "test@example.com");
    await page.fill('input[type="password"]', "Password123");
    const submitButton = await page.locator(
      'button[type="submit"], input[type="submit"]'
    );
    await expect(submitButton).toBeEnabled();
  });

  test("should display error message on failed submit", async ({ page }) => {
    await page.fill('input[type="email"]', "test@test.com");
    await page.fill('input[type="password"]', "wrongpassword");
    await page.click('button[type="submit"], input[type="submit"]');
    const errorMessage = await page.locator('p[role="alert"]');
    await expect(errorMessage).toHaveClass(/opacity-100/);
  });

  test("successful submit should direct to profile page", async ({ page }) => {
    await page.fill('input[type="email"]', "asnmandragora@gmail.com");
    await page.fill('input[type="password"]', "Usertest1");
    await page.click('button[type="submit"], input[type="submit"]');
    await expect(page).toHaveURL(/.*profile*/);
  });
});
