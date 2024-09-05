import { test, expect } from '../custom-test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Swag Labs/);
})

test('loads the login page', async ({ page, sauceVisual }) => {
    await sauceVisual.visualCheck("Before Login");
});

test('should be able to login with standard user', async ({ page, sauceVisual }) => {
    await page.getByTestId('username').fill(process.env.VISUAL_CHECK ? 'visual_user' : 'standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();

    await page.waitForURL('**\/inventory.html', { waitUntil: 'networkidle' });

    await sauceVisual.visualCheck("Inventory Page");
});

test('should not be able to login with a locked user', async ({ page, sauceVisual }) => {
    await page.getByTestId('username').fill('locked_out_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();

    expect(page.url()).toMatch(/.*\/$/);
    await expect(page.getByTestId('error')).toContainText('Sorry, this user has been locked out.');

    await sauceVisual.visualCheck("Locked User Error Message");
});
