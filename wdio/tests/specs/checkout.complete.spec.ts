import CheckoutCompletePage from '../pages/checkout.complete.page.ts';
import { setTestContext } from '../helpers/index.ts';
import { LOGIN_USERS, PAGES } from '../configs/e2e.constants.ts';

describe('Checkout - Complete', () => {
  it('should be able to test loading of login page', async () => {
    await setTestContext({
      user: LOGIN_USERS.STANDARD,
      path: PAGES.CHECKOUT_COMPLETE,
    });

    await expect(await CheckoutCompletePage.waitForIsShown()).toBeTruthy();
    await browser.check('Checkout Complete Page');
  });
});
