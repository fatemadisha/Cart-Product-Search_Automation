exports.ProductAdd = class ProductAdd {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.quantityInput = page.locator('input[name="quantity"]');
    this.addToCartButton = page.locator('button:has-text("Add to cart")');
    this.viewCartLink = page.getByRole('link', { name: 'View Cart' });
    this.productName = page.locator('.product-information h2');
  }

  async setQuantity(quantity) {
    try {
      await this.quantityInput.fill(String(quantity));
    } catch (error) {
      console.error('Error in setQuantity:', error);
      throw error;
    }
  }

  async addToCart() {
    try {
      await this.addToCartButton.click();
    } catch (error) {
      console.error('Error in addToCart:', error);
      throw error;
    }
  }

  async viewCart() {
    try {
      await this.viewCartLink.click();
    } catch (error) {
      console.error('Error in viewCart:', error);
      throw error;
    }
  }

  async getProductName() {
    try {
      return await this.productName.textContent();
    } catch (error) {
      console.error('Error in getProductName:', error);
      throw error;
    }
  }
};