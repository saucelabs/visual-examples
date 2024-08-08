import { $ } from '@wdio/globals';

class LoginPage {
  get bobUserButton() {
    return $('~bob@example.com');
  }

  get visualUserButton() {
    return $('~visual@example.com');
  }

  get loginButton() {
    return $('~Login');
  }

  /**
   * Prefil with Visual User
   */
  async clickVisualUserButton() {
    await this.visualUserButton.click();
  }

  /**
   * Prefil with Bob User
   */
    async clickBobUserButton() {
      await this.bobUserButton.click();
    }

  /**
   * Do Login
   */
  async clickLogin() {
    await this.loginButton.click();
  }
}

export default new LoginPage();
