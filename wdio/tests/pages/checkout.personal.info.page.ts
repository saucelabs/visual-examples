import { $ } from '@wdio/globals';
import Page from './page.ts';
import { DEFAULT_TIMEOUT } from '../configs/e2e.constants.ts';

type PersonalInfoType = {
  firstName?: string;
  lastName?: string;
  zip?: string;
};

class CheckoutPersonalInfoPage extends Page {
  constructor() {
    super('#checkout_info_container');
  }

  private get cancelButton() {
    return $('.cart_cancel_link');
  }

  private get continueCheckoutButton() {
    return $('.cart_button');
  }

  private get firstName() {
    return $('[data-test="firstName"]');
  }

  private get lastName() {
    return $('[data-test="lastName"]');
  }

  private get postalCode() {
    return $('[data-test="postalCode"]');
  }

  private get errorMessage() {
    return $('[data-test="error"]');
  }

  /**
   * Submit personal info
   */
  async submitPersonalInfo(
    personalInfo: PersonalInfoType,
    submit: boolean = true
  ) {
    const { firstName, lastName, zip } = personalInfo;

    await this.waitForIsShown();
    if (firstName) {
      await this.firstName.addValue(firstName);
    }
    if (lastName) {
      await this.lastName.addValue(lastName);
    }
    if (zip) {
      await this.postalCode.addValue(zip);
    }
    if (submit) {
      await this.continueCheckout();
    }
  }

  async continueCheckout() {
    await this.continueCheckoutButton.click();
  }

  /**
   * Get the text or the error message container
   */
  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitForDisplayed({ timeout: DEFAULT_TIMEOUT });

    return this.errorMessage.getText();
  }

  /**
   * Cancel checkout
   */
  async cancelCheckout() {
    await this.cancelButton.click();
  }
}

export default new CheckoutPersonalInfoPage();
