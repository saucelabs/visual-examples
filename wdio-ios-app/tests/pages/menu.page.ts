import { $ } from '@wdio/globals';

class MenuPage {
  get loginButton() {
    return $('~LogOut-menu-item');
  }

  get menuButton() {
    return $('~More-tab-item');
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
