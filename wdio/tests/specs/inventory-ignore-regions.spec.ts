import { LOGIN_USERS } from '../configs/e2e.constants.ts';
import InventoryPage from '../pages/inventory.page.ts';
import LoginPage from '../pages/login.page.ts';

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

describe('Check Inventory', () => {
  it('check that the inventory page looks the same with ignore regions', async () => {
    await LoginPage.open();

    await browser.check('Before Login with static ignore', {
      ignore: [{ width: 200, height: 200, x: 100, y: 100 }],
    });

    await LoginPage.signIn(LOGIN_USERS.STANDARD);

    await InventoryPage.open();

    await browser.check('Inventory Page with element ignore', {
      ignore: [InventoryPage.addBackPackToCartButton],
    });
  });
});
