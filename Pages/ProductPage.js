exports.ProductPage = class ProductPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.productCards = page.locator('.productinfo.text-center');
    this.viewProductLinks = page.locator('a:has-text("View Product")');
  }

  async viewFirstProduct() {
    try {
      await this.viewProductLinks.first().click();
    } catch (error) {
      console.error('Error in viewFirstProduct:', error);
      throw error;
    }
  }
};