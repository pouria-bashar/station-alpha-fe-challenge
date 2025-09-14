import { expect, test } from "@playwright/test";
import { HomePage } from "./pages/home-page";


/**
 * Acceptance Criteria 4: Empty State Verification
 *
 * - Verify the table correctly displays "No users found" message when the API returns an empty array
 */
test("AC4: Verify empty state is displayed correctly", async ({ page }) => {
  await page.route(
    "https://jsonplaceholder.typicode.com/users",
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([]),
      });
    }
  );

  const homePage = new HomePage(page);

  await page.goto("http://localhost:3677");

  // Wait for the loading state to disappear
  await homePage.loading.waitFor({
    state: "hidden",
  });

  // Assert the user table is displayed
  await expect(homePage.table.root).toBeVisible();

  await expect(homePage.table.root.locator('[data-testid="no-users"]')).toHaveText("No users found.");
});
