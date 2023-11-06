import { browser } from '@wdio/globals';
import { LOGIN_USERS } from '../configs/e2e.constants.ts';
import LoginPage from '../pages/login.page.ts';
import InventoryPage from '../pages/inventory.page.ts';

describe('LoginPage', () => {
  beforeEach(async () => {
    await browser.url('');
    await LoginPage.waitForIsShown();
  });

  it('should be able to test loading of login page', async () => {
    await expect(await LoginPage.waitForIsShown()).toBeTruthy();
    await browser.check('Before Login');
  });

  it('should be able to login with a standard user', async () => {
    await LoginPage.signIn(LOGIN_USERS.STANDARD);

    // Wait for the inventory screen and check it
    await expect(await InventoryPage.waitForIsShown()).toBeTruthy();

    await browser.check('Inventory Page');
  });

  it('should not be able to login with a locked user', async () => {
    // It doesn't matter which error we check, all errors should be checked in a UT
    // With this UT we just check that A failure is triggered
    await LoginPage.signIn(LOGIN_USERS.LOCKED);

    await expect(await LoginPage.isErrorMessageDisplayed()).toBeTruthy();
    await expect(await LoginPage.getErrorMessage()).toContain(
      'Epic sadface: Sorry, this user has been locked out.'
    );

    await browser.check('Locked User Error Message');
  });
});
