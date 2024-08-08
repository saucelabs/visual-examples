import { $, $$ } from '@wdio/globals';

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
class CatalogPage {
  get productImages() {
    return $$('~Product Image');
  }

  get productPrices() {
    return $$('~Product Price');
  }

  get catalogContent() {
    return $('//XCUIElementTypeOther[@name="Catalog-screen"]/XCUIElementTypeOther[2]');
  }
}

export default new CatalogPage();