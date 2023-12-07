import { NightwatchTests } from 'nightwatch';
import { DiffStatus } from '@saucelabs/nightwatch-sauce-visual-service';
const USERNAME =
  process.env.VISUAL_CHECK === 'true' ? 'visual_user' : 'standard_user';
const PASSWORD = 'secret_sauce';

const home: NightwatchTests = {
  'Check Inventory Page': () => {
    browser
      .url('https://saucedemo.com')
      .setValue('input[data-test="username"]', USERNAME)
      .setValue('input[data-test="password"]', PASSWORD)
      .click('input[data-test="login-button"]')
      .waitForElementVisible('.inventory_list')
      .sauceVisualCheck('Inventory Page')
      .click('[data-test="add-to-cart-sauce-labs-backpack"]')
      .sauceVisualCheck('Added backpack to cart')
      .assert.sauceVisualResults(DiffStatus.Unapproved, 2);
  },
  'Check Home Page with ignore regions': () => {
    var login = browser.page.login();
    login
      .navigate()
      .waitForElementVisible('@username')
      .sauceVisualCheck('Home Page', {
        ignore: [
          {
            x: 100,
            y: 100,
            width: 200,
            height: 200,
          },
          //
          // NOTE: You can't use the normal page object syntax, like '@username' here.
          // If you do use the normal syntax, then the service will filter out the property, not use it and log a warning like
          //  "Ignoring page object reference: '@username'. Please use the 'pageObjectName.elements.username.selector' annotation.
          //
          login.elements.password.selector,
          [login.elements.username.selector, 'input[data-test="login-button"]'],
        ],
      })
      .assert.sauceVisualResults(DiffStatus.Unapproved, 1);
  },
};

export default home;
