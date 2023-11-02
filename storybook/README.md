# Getting started with Storybook

## Prerequisites

- A device with NodeJS 18+ Support
- Sauce Labs Account

## Run the demo

- Install & setup npm dependencies:

```sh { name=npm-install }
npm install
# On your first run, you'll also need to do a one-time setup with Playwright:
npx playwright install
```

- Start Storybook locally in a separate terminal window and leave running in the background

```sh { name=start-storybook }
npm run storybook
```

- Configure with your Sauce credentials from https://app.saucelabs.com/user-settings and run

```sh { name=set-credentials }
export SAUCE_USERNAME=__YOUR_SAUCE_USER_NAME__
export SAUCE_ACCESS_KEY=__YOUR_SAUCE_ACCESS_KEY__
# You can change the region to upload to via the SAUCE_REGION env variable. See the 
# @saucelabs/visual-storybook README for more details on how to customize your run. 
```

- Run the test

```sh { name=npm-run }
npm run test-storybook
```

- Go to https://app.saucelabs.com/visual/builds and select your latest Storybook run
- Accept all diffs, so they become new baselines.
- Make some changes in one of the Storybook Stories or, optionally, restart Storybook with a `VISUAL_CHECK` env to see all styles removed from the `Button` components for a sample run:
  - `VISUAL_CHECK=1 npm run storybook`
- Re-run the tests
- Open the test or go to https://app.saucelabs.com/visual/builds to review changes.
- It should detect changes and display differences between the two runs of the various stories

### Using different browsers

By default, the tests will be executed on Chromium. If you want to run them on Firefox or Webkit, then please alter [`test-runner-jest.config.js`](./test-runner-jest.config.js) as following

```ts
const { getJestConfig } = require('@storybook/test-runner');
const { getVisualTestConfig } = require('@saucelabs/visual-storybook');

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  // The default configuration comes from @storybook/test-runner
  ...getJestConfig(),
  // The configuration for Sauce Lab's Visual Integration
  ...getVisualTestConfig(),
  /** Add your own overrides below
   * @see https://jestjs.io/docs/configuration
   * @see https://github.com/playwright-community/jest-playwright#configuration
   */
  // Add this to your configuration to run tests in Chromium, Firefox and Webkit
  testEnvironmentOptions: {
    'jest-playwright': {
      browsers: ['chromium', 'firefox', 'webkit'],
    },
  },
};


```

## How to add visual testing to your setup

Please consult our `@saucelabs/visual-storybook` documentation on how to set up a Sauce Visual Testing for Storybook. For more details, visit [@saucelabs/visual-storybook
](https://www.npmjs.com/package/@saucelabs/visual-storybook).