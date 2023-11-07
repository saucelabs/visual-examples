import AppHeaderPage from '../pages/app.header.page.ts';
import InventoryPage from '../pages/inventory.page.ts';
import CartSummaryPage from '../pages/cart.summary.page.ts';
import CheckoutPersonalInfoPage from '../pages/checkout.personal.info.page.ts';
import {setTestContext} from '../helpers/index.ts';
import {LOGIN_USERS, PAGES, PRODUCTS} from "../configs/e2e.constants.ts";

describe('Cart Summary page', () => {
    it('should validate that we can continue shopping', async () => {
        await setTestContext({
            user: LOGIN_USERS.STANDARD,
            path: PAGES.CART,
        });

        await expect(await CartSummaryPage.waitForIsShown()).toBeTruthy();
        await browser.sauceVisualCheck('Cart Summary Page');

        await CartSummaryPage.continueShopping();

        await expect(await InventoryPage.waitForIsShown()).toBeTruthy();
        await browser.sauceVisualCheck('Inventory Page after continuing shopping');
    });

    it('should validate that we can go from the cart to the checkout page', async () => {
        await setTestContext({
            user: LOGIN_USERS.STANDARD,
            path: PAGES.CART,
        });

        await expect(await CartSummaryPage.waitForIsShown()).toBeTruthy();

        await CartSummaryPage.goToCheckout();

        await expect(await CheckoutPersonalInfoPage.waitForIsShown()).toBeTruthy();
        await browser.sauceVisualCheck('Checkout Personal Info Page after going to checkout from cart');
    });

    it('should validate that a product can be removed from the cart', async () => {
        await setTestContext({
            user: LOGIN_USERS.STANDARD,
            path: PAGES.CART,
            products: [PRODUCTS.BACKPACK],
        });

        await expect(await CartSummaryPage.waitForIsShown()).toBeTruthy();

        await expect(await AppHeaderPage.getCartAmount()).toEqual('1');
        await browser.sauceVisualCheck('Cart Summary Page with 1 product');

        await CartSummaryPage.removeSwag(0);

        await expect(await AppHeaderPage.getCartAmount()).toEqual('');

        await expect(await CartSummaryPage.getSwagAmount()).toEqual(0);
        await browser.sauceVisualCheck('Cart Summary Page with 0 products');
    });
});
