import CartSummaryPage from '../pages/cart.summary.page.ts';
import CheckoutPersonalInfoPage from '../pages/checkout.personal.info.page.ts';
import CheckoutSummaryPage from '../pages/checkout.summary.page.ts';
import { LOGIN_USERS, PAGES, PERSONAL_INFO } from '../configs/e2e.constants.ts';
import { setTestContext } from '../helpers/index.ts';

describe('Checkout - Personal info', () => {
  beforeEach(async () => {
    await setTestContext({
      user: LOGIN_USERS.STANDARD,
      path: PAGES.CHECKOUT_PERSONAL_INFO,
    });
    await CheckoutPersonalInfoPage.waitForIsShown();
  });

  it('should validate we get an error if we don not provide all personal information', async () => {
    await browser.sauceVisualCheck('Checkout Empty Personal Info Page');
    // It doesn't matter which error we check here, all error states should have been tested in a UT
    // Reason for selecting this one is that it triggers multiple fields and thus triggers the state
    await CheckoutPersonalInfoPage.submitPersonalInfo(
      PERSONAL_INFO.NO_POSTAL_CODE
    );

    await expect(await CheckoutPersonalInfoPage.waitForIsShown()).toBeTruthy();

    await expect(await CheckoutPersonalInfoPage.getErrorMessage()).toEqual(
      'Error: Postal Code is required'
    );
    await browser.sauceVisualCheck('Checkout Personal Info Page with postal code error');
  });

  it('should validate that we can cancel the first checkout', async () => {
    await expect(await CartSummaryPage.isDisplayed()).toBeFalsy();

    await CheckoutPersonalInfoPage.cancelCheckout();

    await expect(await CartSummaryPage.waitForIsShown()).toBeTruthy();
    await browser.sauceVisualCheck('Cart Summary Page after cancelling the checkout');
  });

  it('should be able to continue the checkout', async () => {
    await CheckoutPersonalInfoPage.submitPersonalInfo(PERSONAL_INFO.STANDARD, false);

    await browser.sauceVisualCheck('Checkout Personal Info Page with filled in info');
    
    await CheckoutPersonalInfoPage.continueCheckout();

    await expect(await CheckoutSummaryPage.waitForIsShown()).toBeTruthy();
    await browser.sauceVisualCheck('Checkout Summary Page after submitting personal info');
  });
});
