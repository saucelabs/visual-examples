import InventoryPage from '../pages/inventory.page.ts';
import LoginPage from '../pages/login.page.ts';

const USERNAME =
  process.env.VISUAL_CHECK === 'true' ? 'visual_user' : 'standard_user';
const PASSWORD = 'secret_sauce';

describe('Check Inventory', () => {
  it('check that the inventory page looks the same with ignore regions', async () => {
    await LoginPage.open();

    await browser.sauceVisualCheck('Before Login', {
      ignore: [{ width: 200, height: 200, x: 100, y: 100 }],
    });

    await LoginPage.login(USERNAME, PASSWORD);

    await InventoryPage.open();

    await browser.sauceVisualCheck('Inventory Page', {
      ignore: [InventoryPage.addBackPackToCartButton],
    });
  });
});
