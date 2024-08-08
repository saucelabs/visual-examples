import { $ } from '@wdio/globals';

class MenuPage {
  get loginButton() {
    return $('~Login Menu Item');
  }

  get menuButton() {
    return $('~View menu');
  }

  /**
   * Open the menu
   */
  async open() {
    await this.menuButton.click();
  }

  /**
   * Click Login Menu Button
   */
  async clickLoginButton() {
    await this.loginButton.click();
  }

  async waitForIsShown(selector: any): Promise<boolean> {
    const result = await selector.waitForDisplayed({
      timeout: 30 * 1000,
    });
    return !!result;
  }
}

export default new MenuPage();
