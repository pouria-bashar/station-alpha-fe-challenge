import { expect, test } from "@playwright/test";
import { johnDoe, janeDoe } from "./test-data";
import { HomePage } from "./pages/home-page";

/**
 * Acceptance Criteria 5: Company Display Verification
 *
 * - Verify users with a company display the company name
 * - Verify users without a company display the cross SVG icon
 * - Validate the presence of the cross SVG icon by checking the data-testid="no-company-icon" attribute
 */
test("AC5: Verify company display is displayed correctly", async ({ page }) => {
  await page.route(
    "https://jsonplaceholder.typicode.com/users",
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          johnDoe,
          janeDoe,
          {
            ...janeDoe,
            id: 3,
            company: null,
          },
        ]),
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

  // Assert the correct company is displayed
  await expect(homePage.table.cell("company", 1)).toHaveText("ABC Corp");

  // Second user: Intentional null company as per implementation in fetchUsers
  await expect(
    homePage.table.cell("company", 2).locator('[data-testid="no-company-icon"]')
  ).toBeVisible();

  // Third user with null company
  await expect(
    homePage.table.cell("company", 3).locator('[data-testid="no-company-icon"]')
  ).toBeVisible();
});
