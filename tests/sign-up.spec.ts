import { test, expect } from "@playwright/test";

test.describe("Sign up page", () => {
  const URL = "http://localhost:3000";

  test.beforeEach(async ({ page }) => {
    await page.goto(`${URL}/sign-up`);
  });

  test("submit button should be disabled when form is empty", async ({
    page,
  }) => {
    const submitButton = page.locator(
      'button[type="submit"], input[type="submit"]'
    );
    await expect(submitButton).toBeDisabled();
  });

  test("submit button should stay disabled for invalid data", async ({
    page,
  }) => {
    await page.fill('input[name="username"]', "ab");
    await page.fill('input[name="email"]', "invalidemail");
    await page.fill('input[name="password"]', "123");
    await page.fill('input[name="confirmPassword"]', "456");

    const submitButton = page.locator(
      'button[type="submit"], input[type="submit"]'
    );
    await expect(submitButton).toBeDisabled();
  });

  test("submit button should be enabled for valid data", async ({ page }) => {
    await page.fill('input[name="username"]', "Testuser1");
    await page.fill('input[name="email"]', "test1@example.com");
    await page.fill('input[name="password"]', "Password123");
    await page.fill('input[name="confirmPassword"]', "Password123");

    const submitButton = page.locator(
      'button[type="submit"], input[type="submit"]'
    );
    await expect(submitButton).toBeEnabled();
  });

  test("successful submit should redirect to activation-required page", async ({
    page,
  }) => {
    await page.fill('input[name="username"]', "Testuser1");
    await page.fill('input[name="email"]', "test1@example.com");
    await page.fill('input[name="password"]', "Password123");
    await page.fill('input[name="confirmPassword"]', "Password123");

    await page.click('button[type="submit"], input[type="submit"]');

    await expect(page).toHaveURL(`${URL}/activation-required`);
  });
});
