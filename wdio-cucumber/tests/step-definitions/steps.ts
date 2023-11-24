import { Given, When, Then } from '@wdio/cucumber-framework';
import { browser } from '@wdio/globals';
import InventoryPage from '../pages/inventory.page.ts';
import LoginPage from '../pages/login.page.ts';

const USERNAME =
  process.env.VISUAL_CHECK === 'true' ? 'visual_user' : 'standard_user';
const PASSWORD = 'secret_sauce';

Given('I am on the login page', async function () {
  await LoginPage.open();
});

When('I check the page before login', async function () {
  await browser.sauceVisualCheck('Before Login');
});

When('I log in with valid credentials', async function () {
  await LoginPage.login(USERNAME, PASSWORD);
});

When('I navigate to the inventory page', async function () {
  await InventoryPage.open();
});

Then('I should see the correct inventory page layout', async function () {
  await browser.sauceVisualCheck('Inventory Page');
});

Then(
  'I should see the correct inventory page layout with ignored regions',
  async function () {
    await browser.sauceVisualCheck('Inventory Page with Ignored Regions', {
      ignore: [
        // An element can be passed in
        InventoryPage.addBackPackToCartButton,
        // or an object with x, y, width, height can be passed in
        {
          x: 100,
          y: 100,
          width: 200,
          height: 200,
        },
      ],
    });
  }
);
