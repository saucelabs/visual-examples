const { getJestConfig } = require('@storybook/test-runner');
const { getVisualTestConfig } = require('@saucelabs/visual-storybook');

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  // The default configuration comes from @storybook/test-runner
  ...getJestConfig(),
  // The configuration for Sauce Lab's Visual Integration
  ...getVisualTestConfig({
    captureDom: true,
  }),

  testEnvironmentOptions: {
    'jest-playwright': {
      useDefaultBrowserType: true,
      browsers: ['chromium', 'webkit', 'firefox'],
      devices: [ 'Desktop Edge', 'Desktop Firefox', 'Desktop Chrome', 'Desktop Safari', 'Pixel 5', 'iPhone 14 Pro Max'],
    },
  },

  /** Add your own overrides below
   * @see https://jestjs.io/docs/configuration
   * @see https://github.com/playwright-community/jest-playwright#configuration
   */
};
