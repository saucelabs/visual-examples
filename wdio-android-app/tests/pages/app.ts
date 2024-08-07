import { $, $$ } from '@wdio/globals';

import { DEFAULT_TIMEOUT } from '../configs/e2e.constants.ts';

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
    return $('~Scrollview manages views in given screen size');
  }
}

export default new CatalogPage();