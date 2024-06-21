import { LOGIN_USERS } from '../configs/e2e.constants.ts';
import InventoryPage from '../pages/inventory.page.ts';
import LoginPage from '../pages/login.page.ts';

describe('Check Inventory', () => {
  it('check that the inventory page looks the same with ignore regions', async () => {
    await LoginPage.open();

    await browser.sauceVisualCheck('Before Login with static ignore', {
      regions: [
        {
          element: { width: 200, height: 200, x: 100, y: 100 },
          enableOnly: [],
        },
      ],
    });

    await LoginPage.signIn(LOGIN_USERS.STANDARD);

    await InventoryPage.open();

    await browser.sauceVisualCheck('Inventory Page with element ignore', {
      regions: [
        // Only checks for positions changes on InventoryPage.addBackPackToCartButton
        { element: InventoryPage.addBackPackToCartButton, enableOnly: ['position'] },
        {
          element: { width: 200, height: 200, x: 100, y: 100 },
          enableOnly: [],
        },
      ],
    });
  });
});
