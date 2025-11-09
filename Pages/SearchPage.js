exports.SearchPage = class SearchPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.productsLink = page.getByRole('link', { name: 'Products' });
    this.searchInput = page.locator('input[name="search"]');
    this.searchButton = page.locator('#submit_search');
  }

  async goto() {
    try {
      await this.page.goto('https://automationexercise.com/');
    } catch (error) {
      console.error('Error in goto:', error);
      throw error;
    }
  }
  
  async isHomeVisible() {
    try {
      return await this.page.getByRole('heading', { name: 'Features Items' }).isVisible();
    } catch (error) {
      console.error('Error in isHomeVisible:', error);
      throw error;
    }
  }

  async navigateToProducts() {
    try {
      await this.productsLink.click();
    } catch (error) {
      console.error('Error in navigateToProducts:', error);
      throw error;
    }
  }

  async searchForProduct(productName) {
    try {
      await this.searchInput.fill(productName);
      await this.searchButton.click();
    } catch (error) {
      console.error('Error in searchForProduct:', error);
      throw error;
    }
  }

  async areSearchResultsVisible() {
    try {
      // Check that at least one product is visible in the search results
      return await this.page.locator('.features_items .productinfo').first().isVisible();
    } catch (error) {
      console.error('Error in areSearchResultsVisible:', error);
      throw error;
    }
  }
};