import { expect, test } from "@playwright/test";
import { johnDoe, janeDoe } from "./test-data";
import { HomePage } from "./pages/home-page";

/**
 * Acceptance Criteria 3: Display User Data Verification
 *
 * - Verify the table correctly displays user data in each column
 * - Verify links in the website column point to the correct URL
 */
test("AC3: Verify user data is displayed correctly", async ({ page }) => {
  await page.route(
    "https://jsonplaceholder.typicode.com/users",
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([johnDoe, janeDoe]),
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

  // Assert the correct user data is displayed
  await expect(homePage.table.cell("name", 1)).toHaveText(johnDoe.name);
  await expect(homePage.table.cell("username", 1)).toHaveText(johnDoe.username);
  await expect(homePage.table.cell("email", 1)).toHaveText(johnDoe.email);
  await expect(homePage.table.cell("city", 1)).toHaveText(johnDoe.address.city);
  await expect(homePage.table.cell("phone", 1)).toHaveText(johnDoe.phone);
  await expect(homePage.table.cell("website", 1)).toHaveText(johnDoe.website);
  await expect(homePage.table.cell("company", 1)).toHaveText("ABC Corp");
  await expect(homePage.table.cell("website", 1).locator("a")).toHaveAttribute(
    "href",
    `https://${johnDoe.website}`
  );

  // Second user
  // Assert the correct user data is displayed
  await expect(homePage.table.cell("name", 2)).toHaveText(janeDoe.name);
  await expect(homePage.table.cell("username", 2)).toHaveText(janeDoe.username);
  await expect(homePage.table.cell("email", 2)).toHaveText(janeDoe.email);
  await expect(homePage.table.cell("city", 2)).toHaveText(janeDoe.address.city);
  await expect(homePage.table.cell("phone", 2)).toHaveText(janeDoe.phone);
  await expect(homePage.table.cell("website", 2)).toHaveText(janeDoe.website);
  // Intentional null company as per implementation in fetchUsers
  const companyCell = homePage.table.cell("company", 2);
  await expect(
    companyCell.locator('[data-testid="no-company-icon"]')
  ).toBeVisible();

  await expect(homePage.table.cell("website", 2).locator("a")).toHaveAttribute(
    "href",
    `https://${janeDoe.website}`
  );
});
