exports.ViewCart = class ViewCart {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  this.cartTable = page.locator('#cart_info_table');
  this.quantityInput = page.locator('td.cart_quantity')
  }

  async getQuantity() {
    try {
      const text = await this.quantityInput.textContent();
      return text ? text.trim() : '';
    } catch (error) {
      console.error('Error in getQuantity:', error);
      throw error;
    }
  }

  async isProductInCart(productName) {
    try {
      return await this.cartTable.locator(`text=${productName}`).isVisible();
    } catch (error) {
      console.error('Error in isProductInCart:', error);
      throw error;
    }
  }
};