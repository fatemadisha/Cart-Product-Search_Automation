// @ts-check

import { test, expect } from '@playwright/test';

test.describe('Add quantity and verify cart', () => {
  test('Add 4 items to cart and verify the product successfully', async ({ page }) => {
    // Open browser and navigate to URL
    await page.goto('https://automationexercise.com/');

    // Home page loaded successfully
    await expect(page).toHaveTitle(/Automation Exercise/); 

    // Click on the "Products" 
    await page.getByRole('link', { name: 'Products' }).click();

    // Click a product
    await page.getByRole('link', { name: 'View Product' }).first().click();

    // Verify Product details
    const productTitle = page.getByRole('heading', { name: 'Blue Top' });
    await expect(productTitle).toBeVisible();
    const priceLocator = page.locator(':text-is("Rs. 500")')
    await expect(priceLocator).toBeVisible();

    // Change the quantity from the defaulto 4
    const qtyInput = page.getByRole('spinbutton');
    await qtyInput.fill('4');
    await expect(qtyInput).toHaveValue('4');

    // Click the "Add to cart" button
    await page.getByRole('button', { name: 'Add to cart' }).click();

    // Click the "View Cart" link
    const viewCartLink = page.getByText('View Cart');
    await expect(viewCartLink).toBeVisible();
    await viewCartLink.click();

    // Verify quantity
    const cartTable = page.locator('#product-1');
    await expect(cartTable).toContainText('4');

    // Verify the product title matches
    const cartProductTitle = cartTable.getByRole('heading', { level: 4 }).first();
    await expect(cartProductTitle).toBeVisible();

    // Verify total = unit price * quantity
    const priceText = (await priceLocator.textContent()) || '';
    const priceNumber = parseInt(priceText.replace(/[^0-9]/g, ''), 10);
    const quantity = 4;

    const lineTotalText = (await cartTable.locator('.cart_total_price').textContent()) || '';
    const lineTotalNumber = parseInt(lineTotalText.replace(/[^0-9]/g, ''), 10);

    console.log(`Price: ${priceNumber}, Quantity: ${quantity}, Total in Cart: ${lineTotalNumber}`);

    expect(lineTotalNumber).toBe(priceNumber * quantity);
  });
});
