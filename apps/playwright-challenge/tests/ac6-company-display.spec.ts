import { expect, test } from "@playwright/test";
import { HomePage } from "./pages/home-page";


/**
 * Acceptance Criteria 6: Error Handling
 *
 * - Verify the error modal is displayed when the API returns an error response
 * - Verify the error message is displayed correctly
 * - Verify the error modal is closed when the user clicks the close button
 */
test("AC6: Verify error handling is displayed correctly", async ({ page }) => {
  await page.route(
    "https://jsonplaceholder.typicode.com/users",
    async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({}),
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
  await expect(
    homePage.errorModal.overlay
  ).toBeVisible();


  await expect(
    homePage.errorModal.message
  ).toHaveText("Failed to load users. Please try again later.");

  // Verify the error modal is closed when the user clicks the close button
  await homePage.errorModal.closeButton.click();
  await expect(
    homePage.errorModal.overlay
  ).toBeHidden();

});
