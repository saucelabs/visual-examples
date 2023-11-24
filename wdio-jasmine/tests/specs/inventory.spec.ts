import { browser } from '@wdio/globals';
import InventoryPage from '../pages/inventory.page.ts';
import LoginPage from '../pages/login.page.ts';

const USERNAME =
  process.env.VISUAL_CHECK === 'true' ? 'visual_user' : 'standard_user';
const PASSWORD = 'secret_sauce';

describe('Check Inventory', () => {
  it('check that the inventory page looks the same', async () => {
    await LoginPage.open();

    await browser.sauceVisualCheck('Before Login');

    await LoginPage.login(USERNAME, PASSWORD);

    await InventoryPage.open();

    await browser.sauceVisualCheck('Inventory Page');
  });
});
