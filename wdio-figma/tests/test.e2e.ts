import { $, browser } from '@wdio/globals'

const waitForURL = async (url: RegExp) => {
    return await browser.waitUntil(async () => (
        url.test(await browser.getUrl())
    ));
}

describe('Sauce Demo App Logged Out', () => {
    it('should login with valid credentials', async () => {
        await browser.url('/');

        await browser.sauceVisualCheck("Log in");

        await $('input[data-test="username"]').setValue('standard_user');
        await $('input[data-test="password"]').setValue('secret_sauce');
        await $('input[data-test="login-button"]').click();

        await waitForURL(/\/inventory\.html/);
        await browser.sauceVisualCheck("Products");

        // View product details
        await $$('[data-test=inventory-item-name]')[0].click();
        await waitForURL(/\/inventory-item\.html/);
        await browser.sauceVisualCheck("Product details");

        // Add items and view cart
        await browser.url('/inventory.html');
        await waitForURL(/\/inventory\.html/);
        await $$('.btn_inventory')[0].click();
        await $$('.btn_inventory')[1].click();
        await $('[data-test=shopping-cart-link]').click();
        await waitForURL(/\/cart\.html/);
        await browser.sauceVisualCheck("Your cart");

        // View checkout page
        await $('[data-test=checkout]').click();
        await waitForURL(/\/checkout-step-one\.html/);
        await browser.sauceVisualCheck("Checkout information");
    })
})
