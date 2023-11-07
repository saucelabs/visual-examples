import InventoryPage from '../pages/inventory.page.ts';
import CheckoutCompletePage from '../pages/checkout.complete.page.ts';
import CheckoutSummaryPage from '../pages/checkout.summary.page.ts';
import { setTestContext } from '../helpers/index.ts';
import { LOGIN_USERS, PAGES, PRODUCTS } from '../configs/e2e.constants.ts';

describe('Checkout - Summary', () => {
  beforeEach(async () => {
    await setTestContext({
      user: LOGIN_USERS.STANDARD,
      path: PAGES.CHECKOUT_SUMMARY,
      products: [PRODUCTS.BACKPACK],
    });
    await CheckoutSummaryPage.waitForIsShown();
  });

  it('should validate that we can continue shopping', async () => {
    await browser.sauceVisualCheck('Checkout Summary Page');
    await CheckoutSummaryPage.finishCheckout();

    await expect(await CheckoutCompletePage.waitForIsShown()).toBeTruthy();
    await browser.sauceVisualCheck('Checkout Complete Page after finishing checkout');
  });

  it('should validate that we can cancel checkout and go to the inventory page', async () => {
    await CheckoutSummaryPage.cancelCheckout();

    await expect(await InventoryPage.waitForIsShown()).toBeTruthy();
    await browser.sauceVisualCheck('Inventory Page after cancelling the checkout');
  });

  it('should validate that we have 1 product in our checkout overview', async () => {
    await expect(await CheckoutSummaryPage.getSwagAmount()).toEqual(1);
    await browser.sauceVisualCheck('Checkout Summary Page with one product');
  });
});
