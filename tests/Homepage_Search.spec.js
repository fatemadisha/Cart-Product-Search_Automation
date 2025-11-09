const { test, expect } = require('@playwright/test');
const { SearchPage } = require('../Pages/SearchPage');

test('Search for a product from homepage', async ({ page }) => {
  const searchPage = new SearchPage(page);
  await searchPage.goto();

  // Assert Home is visible successfully after navigate to URL
  await searchPage.isHomeVisible(); 
  await searchPage.navigateToProducts();
  await searchPage.searchForProduct('Blue Top');
  // Assert that search results contain the searched product
  await expect(page.locator('.features_items')).toContainText('Blue Top');

  //  Assert all search products are visible properly
  await expect(await searchPage.areSearchResultsVisible()).toBeTruthy();

  // Assert that search results contain the searched product
  await expect(page.locator('.features_items')).toContainText('Blue Top');
});