const { test, expect } = require('@playwright/test');
const { SearchPage } = require('../Pages/SearchPage');
const { ProductPage } = require('../Pages/ProductPage');
const { ProductAdd } = require('../Pages/ProductAdd');
const { ViewCart } = require('../Pages/ViewCart');

test.describe('Product Cart Flow', () => {
  test('Add quantity 4 and verify cart', async ({ page }) => {
  const search = new SearchPage(page);
  const products = new ProductPage(page);
  const details = new ProductAdd(page);
  const cart = new ViewCart(page);

  // Go to home page
  await search.goto();

  // Assert Home is visible successfully after navigate to URL
  await search.isHomeVisible(); 

  // Navigate to Products
  await search.navigateToProducts();

  // Click on 'View Product'
  await products.viewFirstProduct();

  // Verify product details is open
  const productName = await details.getProductName();
  expect(productName).not.toBeNull();

  // Add 4 quantity in cart
  await details.setQuantity(4);
  await details.addToCart();

  // View the cart
  await details.viewCart();

  // Verify the cart with the given quantity
  expect(await cart.isProductInCart(productName.trim())).toBeTruthy();
  expect(await cart.getQuantity()).toBe('4');
  });
});