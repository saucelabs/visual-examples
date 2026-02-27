import { getJestConfig } from '@storybook/test-runner';
import { getVisualTestConfig } from '@saucelabs/visual-storybook';

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
export default {
  ...getJestConfig(),
  // The configuration for Sauce Lab's Visual Integration
  ...getVisualTestConfig(),

  testEnvironmentOptions: {
    'jest-playwright': {
      useDefaultBrowserType: true,
      browsers: ['chromium', 'webkit', 'firefox'],
      devices: [ 'Desktop Edge', 'Desktop Firefox', 'Desktop Chrome', 'Desktop Safari', 'Pixel 5', 'iPhone 14 Pro Max'],
    },
  },
  testTimeout: 60_000,
  /** Add your own overrides below, and make sure
   *  to merge testRunnerConfig properties with your own
   * @see https://jestjs.io/docs/configuration
   */
};
