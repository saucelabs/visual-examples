import { browser } from '@wdio/globals';
import AppHeaderPage from '../pages/app.header.page.ts';
import InventoryPage from '../pages/inventory.page.ts';
import InventoryDetailsPage from '../pages/inventory.details.page.ts';
import CartSummaryPage from '../pages/cart.summary.page.ts';
import { setTestContext } from '../helpers/index.ts';
import { LOGIN_USERS, PAGES, PRODUCTS } from '../configs/e2e.constants.ts';

describe('Swag items list', () => {
  it('should validate that all products are present', async () => {
    await setTestContext({
      user: LOGIN_USERS.STANDARD,
      path: PAGES.SWAG_ITEMS,
    });
    await InventoryPage.waitForIsShown();

    await expect(await InventoryPage.getAmount()).toEqual(6);

    await browser.sauceVisualCheck('Inventory overview');
  });

  it('should validate that the details of a product can be opened', async () => {
    await setTestContext({
      user: LOGIN_USERS.STANDARD,
      path: PAGES.SWAG_ITEMS,
    });
    await InventoryPage.waitForIsShown();

    const product = 'Sauce Labs Backpack';

    await InventoryPage.openSwagDetails(product);

    await expect(await InventoryDetailsPage.waitForIsShown()).toBeTruthy();

    await expect(await InventoryDetailsPage.getText()).toContain(product);

    await browser.sauceVisualCheck(`${product} Details Page`);
  });

  it('should validate that a product can be added to the cart', async () => {
    await setTestContext({
      user: LOGIN_USERS.STANDARD,
      path: PAGES.SWAG_ITEMS,
    });
    await InventoryPage.waitForIsShown();

    await expect(await AppHeaderPage.getCartAmount()).toEqual('');

    await InventoryPage.addSwagToCart(0);

    await expect(await AppHeaderPage.getCartAmount()).toEqual('1');

    await browser.sauceVisualCheck('Cart with one item');
  });

  it('should validate that a product can be removed from the cart', async () => {
    await setTestContext({
      user: LOGIN_USERS.STANDARD,
      path: PAGES.SWAG_ITEMS,
      products: [PRODUCTS.BACKPACK],
    });
    await InventoryPage.waitForIsShown();

    await expect(await AppHeaderPage.getCartAmount()).toEqual('1');

    await InventoryPage.removeSwagFromCart(0);

    await expect(await AppHeaderPage.getCartAmount()).toEqual('');
  });

  it('should be able to open the cart summary page', async () => {
    await setTestContext({
      user: LOGIN_USERS.STANDARD,
      path: PAGES.SWAG_ITEMS,
    });
    await InventoryPage.waitForIsShown();

    await AppHeaderPage.openCart();

    await expect(await CartSummaryPage.waitForIsShown()).toBeTruthy();

    await browser.sauceVisualCheck('Empty Cart Summary Page');
  });
});
