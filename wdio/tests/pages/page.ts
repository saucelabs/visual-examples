import { DEFAULT_TIMEOUT } from '../configs/e2e.constants.ts';

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default class Page {
  private selector;

  constructor(selector) {
    this.selector = selector;
  }

  /**
   * Opens a sub page of the page
   * @param path path of the sub page (e.g. /path/to/page.html)
   */
  public open(path?: string) {
    return browser.url(`https://saucedemo.com${path}`);
  }

  /**
   * Wait for the element to be displayed
   */
  async waitForIsShown(isShown = true): Promise<boolean> {
    try {
      const result = await $(this.selector).waitForDisplayed({
        timeout: DEFAULT_TIMEOUT,
        reverse: !isShown,
      });

      return !!result;
    } catch (e) {
      return !isShown;
    }
  }

  /**
   * Give back if the element is displayed
   */
  async isDisplayed(): Promise<boolean> {
    return $(this.selector).isDisplayed();
  }
}
