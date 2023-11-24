import { $ } from '@wdio/globals';
import Page from './page.ts';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class InventoryPage extends Page {
  /**
   * define selectors using getter methods
   */
  public get addBackPackToCartButton() {
    return $('#add-to-cart-sauce-labs-backpack');
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */
  public async addBackPackToCart() {
    await this.addBackPackToCartButton.click();
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  public async open() {
    await super.open('/inventory.html');

    return this.addBackPackToCartButton.waitForDisplayed();
  }
}

export default new InventoryPage();
