import { $ } from '@wdio/globals';

class LoginPage {
  get bobUserButton() {
    return $('~Tap to use this username for login');
  }

  get visualUserButton() {
    return $('~Visual User Login');
  }

  get loginButton() {
    return $('~Tap to login with given credentials');
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
