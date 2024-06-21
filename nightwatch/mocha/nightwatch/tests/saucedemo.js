const { DiffingMethod } = require('@saucelabs/nightwatch-sauce-visual-service');
const USERNAME =
  process.env.VISUAL_CHECK === 'true' ? 'visual_user' : 'standard_user';
const PASSWORD = 'secret_sauce';

describe('Saucedemo example', function () {
  it('should check the Inventory Page', (browser) => {
    browser
      .url('https://saucedemo.com')
      .setValue('input[data-test="username"]', USERNAME)
      .setValue('input[data-test="password"]', PASSWORD)
      .click('input[data-test="login-button"]')
      .waitForElementVisible('.inventory_list')
      // NOTE: adding the `this` context is required for the service
      // to properly pass the suite and test name to Sauce Labs Visual
      .sauceVisualCheck('Inventory Page', this)
      .click('[data-test="add-to-cart-sauce-labs-backpack"]')
      // NOTE: adding the `this` context is required for the service
      // to properly pass the suite and test name to Sauce Labs Visual
      .sauceVisualCheck('Added backpack to cart', this);
    // This `sauceVisualResults` command is only available when using the `default` and `CucumberJS` TestRunners.
    // It is not available when using the `mocha` TestRunner.
    // .assert.sauceVisualResults(DiffStatus.Unapproved, 2);
  });

  it('should check the Home Page with ignore regions', (browser) => {
    const login = browser.page.login();
    login
      .navigate()
      .waitForElementVisible('@username')
      .sauceVisualCheck(
        'Home Page',
        {
          diffingMethod: DiffingMethod.Balanced,
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
        },
        // NOTE: adding the `this` context is required for the service
        // to properly pass the suite and test name to Sauce Labs Visual
        this
      );
    // This `sauceVisualResults` command is only available when using the `default` and `CucumberJS` TestRunners.
    // It is not available when using the `mocha` TestRunner.
    // .assert.sauceVisualResults(DiffStatus.Unapproved, 1);
  });

  after((browser) => browser.end());
});
