import { test, expect } from "@playwright/test";

test.describe("Sign in page", () => {
  const URL = "http://localhost:3000";

  test.beforeEach(async ({ page }) => {
    await page.goto(`${URL}/sign-in`);
  });

  test("submit button should be disabled when form is empty", async ({
    page,
  }) => {
    const submitButton = page.locator(
      'button[type="submit"], input[type="submit"]'
    );
    await expect(submitButton).toBeDisabled();
  });

  test("submit button should be enabled when inputs are filled", async ({
    page,
  }) => {
    await page.fill('input[type="email"]', "test@example.com");
    await page.fill('input[type="password"]', "Password123");

    const submitButton = page.locator(
      'button[type="submit"], input[type="submit"]'
    );
    await expect(submitButton).toBeEnabled();
  });

  test("should display error message on failed submit", async ({ page }) => {
    await page.fill('input[type="email"]', "test@test.com");
    await page.fill('input[type="password"]', "wrongpassword");

    await page.click('button[type="submit"], input[type="submit"]');

    const errorMessage = page.locator('p[role="alert"]');
    await expect(errorMessage).not.toHaveText(".");
  });

  test("successful submit should redirect to profile page", async ({
    page,
  }) => {
    await page.fill('input[type="email"]', "asnmandragora@gmail.com");
    await page.fill('input[type="password"]', "Usertest1");

    await page.click('button[type="submit"], input[type="submit"]');

    await expect(page).toHaveURL(`${URL}/profile`);
  });
});
