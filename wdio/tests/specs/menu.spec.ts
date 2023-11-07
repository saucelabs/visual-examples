import AppHeaderPage from '../pages/app.header.page.ts';
import InventoryPage from '../pages/inventory.page.ts';
import LoginPage from '../pages/login.page.ts';
import CartSummaryPage from '../pages/cart.summary.page.ts';
import MenuPage from '../pages/menu.page.ts';
import { setTestContext } from '../helpers/index.ts';
import { LOGIN_USERS, PAGES, PRODUCTS } from '../configs/e2e.constants.ts';

describe('Menu', () => {
  beforeEach(async () => {
    await setTestContext({
      user: LOGIN_USERS.STANDARD,
      path: PAGES.CART,
      products: [PRODUCTS.BACKPACK],
    });
    await CartSummaryPage.waitForIsShown();
  });

  it('should be able to the swag items overview page', async () => {
    await MenuPage.open();
    await browser.sauceVisualCheck('Open Menu');
    await MenuPage.openInventoryList();

    await expect(await InventoryPage.waitForIsShown()).toBeTruthy();
    await browser.sauceVisualCheck('Inventory Page after opening the menu');
  });

  // Don't execute this test on the EU DC, the saucelabs.com url is not working there making this test fail
  if (process.env?.REGION !== 'eu') {
    it('should be able to open the about page', async () => {
      await MenuPage.open();
      await MenuPage.openAboutPage();

      await expect(await CartSummaryPage.waitForIsShown(false)).toBeTruthy();
    });
  }

  it('should be able to log out', async () => {
    await MenuPage.open();
    await MenuPage.logout();

    await expect(await LoginPage.waitForIsShown()).toBeTruthy();
    await browser.sauceVisualCheck('Login Page after logout');
  });

  it('should be able to clear the cart', async () => {
    await MenuPage.open();
    await expect(await AppHeaderPage.getCartAmount()).toEqual('1');

    await MenuPage.restAppState();

    await expect(await AppHeaderPage.getCartAmount()).toEqual('');
    await browser.sauceVisualCheck('Cart after clearing it through the menu');
  });
});
