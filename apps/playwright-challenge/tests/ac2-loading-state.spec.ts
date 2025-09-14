import { expect, test } from "@playwright/test";
import { johnDoe } from "./test-data";
import { HomePage } from "./pages/home-page";

/**
 * Acceptance Criteria 2: Loading State Verification
 *
 * - Verify the application shows a loading state while fetching data
 * - Verify the loading state is replaced by the user table once data is loaded
 */
test("AC2: Verify loading state is displayed correctly", async ({ page }) => {
  await page.route(
    "https://jsonplaceholder.typicode.com/users",
    async (route) => {
      // Wait for 1 second to simulate loading time
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([johnDoe]),
      });
    }
  );

  const homePage = new HomePage(page);

  await page.goto("http://localhost:3677");
  // Assert the loading spinner is visible
  await expect(homePage.loading).toBeVisible();
  // Wait for the loading state to disappear
  await homePage.loading.waitFor({
    state: "hidden",
  });
  // Assert the user table is displayed
  await expect(homePage.table.root).toBeVisible();
});
