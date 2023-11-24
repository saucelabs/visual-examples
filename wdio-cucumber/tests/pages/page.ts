import { browser } from '@wdio/globals';

export default class Page {
  /**
   * Opens a sub page of the page
   * @param path path of the sub page (e.g. /path/to/page.html)
   */
  public async open(path?: string) {
    return browser.url(`https://saucedemo.com${path}`);
  }
}
