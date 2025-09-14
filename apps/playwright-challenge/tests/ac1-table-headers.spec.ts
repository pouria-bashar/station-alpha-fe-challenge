import { test, expect } from '@playwright/test';
import { HomePage } from './pages/home-page';
import { johnDoe } from './test-data';

/**
 * Acceptance Criteria 1: Table Headers Verification
 * 
 * - Verify the user table displays the correct headers: 
 *   ID, Name, Username, Email, City, Phone, Website, and Company
 */
test('AC1: Verify table headers display correctly', async ({ page }) => {
  // Navigate to the app
  await page.goto('http://localhost:3677');

  // Mock API to return users (but with a deliberate error in the request URL)
  await page.route('https://jsonplaceholder.typicode.com/users', async (route) => {
    // Notice the typo in 'usrs' above - this is a distractor that will cause the test to fail
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(johnDoe)
    });
  });
  const homePage = new HomePage(page);

  // Wait for the loading state to disappear
  await homePage.loading.waitFor({ state: 'hidden' });

  // Attempt to verify table headers
  // This list is incomplete - student will need to add the remaining headers
  const expectedHeaders = ['ID', 'Name', 'Username', 'Email', 'City', 'Phone', 'Website', 'Company'];
  
  for (const header of expectedHeaders) {
    await expect(homePage.table.header(header.toLowerCase())).toHaveText(header);
  }
  
});

/* 
 * TASK FOR CANDIDATE:
 * 
 * This test has two issues:
 * 1. It's not mocking the correct API endpoint. There's a typo in the URL.
 * 2. It's not checking all the required table headers.
 *
 * The real API endpoint is: https://jsonplaceholder.typicode.com/users
 * 
 * You should:
 * 1. Fix the API endpoint in the route mock
 * 2. Complete the assertions for all required table headers
 * 3. Make sure the test passes by running: npx playwright test
 */ 