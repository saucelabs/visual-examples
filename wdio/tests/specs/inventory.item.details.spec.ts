import AppHeaderPage from '../pages/app.header.page.ts';
import InventoryDetailsPage from '../pages/inventory.details.page.ts';
import { setTestContext } from '../helpers/index.ts';
import { LOGIN_USERS, PAGES, PRODUCTS } from '../configs/e2e.constants.ts';

describe('Swag Item Details', () => {
  it('should validate that we can go back from the details to the inventory page', async () => {
    const product = 'Sauce Labs Backpack';

    await setTestContext({
      user: LOGIN_USERS.STANDARD,
      path: PAGES.SWAG_ITEMS,
    });
    await browser.url(`${PAGES.SWAG_DETAILS}?id=${PRODUCTS.BACKPACK}`);

    await InventoryDetailsPage.waitForIsShown();
    await browser.check(`${product} Details Page`);
    await InventoryDetailsPage.goBack();

    await expect(await InventoryDetailsPage.waitForIsShown(false)).toBeTruthy();
    await browser.check('Inventory Page');
  });

  it('should validate that a product can be added to a cart', async () => {
    await setTestContext({
      user: LOGIN_USERS.STANDARD,
      path: PAGES.SWAG_ITEMS,
    });
    await browser.url(`${PAGES.SWAG_DETAILS}?id=${PRODUCTS.BACKPACK}`);
    await InventoryDetailsPage.waitForIsShown();

    await expect(await AppHeaderPage.getCartAmount()).toEqual('');

    await InventoryDetailsPage.addToCart();

    await expect(await AppHeaderPage.getCartAmount()).toEqual('1');
    browser.check('Inventory Details Cart with one item');
  });

  it('should validate that a product can be removed from the cart', async () => {
    await setTestContext({
      user: LOGIN_USERS.STANDARD,
      path: PAGES.SWAG_ITEMS,
      products: [PRODUCTS.BACKPACK],
    });
    await browser.url(`${PAGES.SWAG_DETAILS}?id=${PRODUCTS.BACKPACK}`);
    await InventoryDetailsPage.waitForIsShown();

    await expect(await AppHeaderPage.getCartAmount()).toEqual('1');

    await InventoryDetailsPage.removeFromCart();

    await expect(await AppHeaderPage.getCartAmount()).toEqual('');
    await browser.check('Inventory Details Cart with removed item');
  });
});
