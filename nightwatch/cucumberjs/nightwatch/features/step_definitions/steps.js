const { Given, Then, When } = require('@cucumber/cucumber');
const { DiffStatus } = require('@saucelabs/nightwatch-sauce-visual-service');
const USERNAME =
  process.env.VISUAL_CHECK === 'true' ? 'visual_user' : 'standard_user';
const PASSWORD = 'secret_sauce';

Given(/^I am on the login page$/, function () {
  return browser
    .navigateTo('https://www.saucedemo.com')
    .waitForElementVisible('input[data-test="login-button"]');
});

When(/^I check the page before login$/, function () {
  return browser.sauceVisualCheck('Before Login');
});

When(/^I log in with valid credentials$/, function () {
  return browser
    .setValue('input[data-test="username"]', USERNAME)
    .setValue('input[data-test="password"]', PASSWORD)
    .click('input[data-test="login-button"]');
});

When(/^I navigate to the inventory page$/, function () {
  return browser.waitForElementVisible('.inventory_list');
});

Then(/^I should see the correct inventory page layout$/, function () {
  return (
    browser
      .sauceVisualCheck('Inventory Page')
      // We expect 2 visual diffs, one for the Inventory Page and one for the Added backpack to cart
      // They are unapproved because we haven't approved them yet
      .assert.sauceVisualResults(DiffStatus.Unapproved, 2)
  );
});

Then(
  /^I should see the correct home page layout with ignored regions$/,
  function () {
    const login = browser.page.login();
    return (
      login
        .sauceVisualCheck('Home Page', {
          regions: [
            {
              element: login.elements.username.selector,
              disableOnly: ['content'],
            },
            {
              element: login.elements.password.selector,
              enableOnly: [],
            },
            {
              element: { x: 100, y: 100, width: 200, height: 200 },
              enableOnly: [],
            },
          ],
        })
        // We expect 1 visual diff, one for the Home Page
        // They are unapproved because we haven't approved them yet
        .assert.sauceVisualResults(DiffStatus.Unapproved, 1)
    );
  }
);
