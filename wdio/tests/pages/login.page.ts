import { $ } from '@wdio/globals';
import { DEFAULT_TIMEOUT, PAGES } from '../configs/e2e.constants.ts';
import Page from './page.ts';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
  constructor() {
    super('#login_button_container');
  }

  /**
   * define selectors using getter methods
   */
  public get inputUsername() {
    return $('input[data-test="username"]');
  }

  public get inputPassword() {
    return $('input[data-test="password"]');
  }

  public get btnSubmit() {
    return $('input[data-test="login-button"]');
  }

  public get errorMessage() {
    return $('[data-test="error"]');
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */
  public async signIn(userDetails: { username: string; password: string }) {
    const { password, username } = userDetails;
    await this.waitForIsShown();
    if (username) {
      await this.inputUsername.setValue(username);
    }
    if (password) {
      await this.inputPassword.setValue(password);
    }
    await this.btnSubmit.click();
  }

  /**
   * Get the text or the error message container
   */
  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitForDisplayed({ timeout: DEFAULT_TIMEOUT });

    return this.errorMessage.getText();
  }

  /**
   * Check if the error message is displayed
   */
  async isErrorMessageDisplayed(): Promise<boolean> {
    return this.errorMessage.isDisplayed();
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  public open() {
    return super.open(PAGES.LOGIN);
  }
}

export default new LoginPage();
