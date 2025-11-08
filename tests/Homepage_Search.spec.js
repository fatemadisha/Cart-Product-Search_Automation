// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Homepage Visibility', () => {
  test('Search from All Products for "Blue top" and verify results', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('https://automationexercise.com/');
    await expect(page).toHaveTitle(/Automation Exercise/i);

    // Click Products in top navigation
    await page.getByRole('link', { name: 'Products' }).click();
    await expect(page.getByRole('heading', { name: /All Products/i })).toBeVisible();

    // Type the search term and submit (use Enter for reliability)
    const searchTerm = 'Blue';
    const searchInput = page.getByPlaceholder('Search Product');
    await expect(searchInput).toBeVisible();
    await searchInput.fill(searchTerm);
    await page.locator('#submit_search').click();

    // Wait for the Searched Products heading
  const searchedHeading = page.locator('h2:has-text("SEARCHED PRODUCTS")');
  await expect(searchedHeading).toBeVisible();

    // Locate product cards
  const productCards = page.locator(".features_items .col-sm-4");
  await expect(productCards.first()).toBeVisible({ timeout: 5000 });

    // Ensure one product exists
    const cardsCount = await productCards.count();
    expect(cardsCount).toBeGreaterThan(0);

    // Verify each product card
    let matchedCount = 0;
    

    for (let i = 0; i < cardsCount; i++) {
      const card = productCards.nth(i);
      await card.scrollIntoViewIfNeeded();
      const nameLocator = card.locator('p').first();
      const nameText = (await nameLocator.textContent())?.trim() || '';

      // Ensure the product name is visible and count
      await expect(nameLocator).toBeVisible();
      expect(nameText.length).toBeGreaterThan(0);

       if (nameText.toLowerCase().includes(searchTerm.toLowerCase())) {
        matchedCount++;
      }
    }

    console.log(`Total products found matching "${searchTerm}":`, matchedCount);

    // Assertion: at least one match
    expect(matchedCount).toBeGreaterThan(0);
  });
});

  
