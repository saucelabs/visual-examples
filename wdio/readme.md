# Getting started with WebdriverIO

## Prerequisites

- Mac System - Ventura
- Sauce Labs Account
- Git
- Homebrew

## Run the demo

- Clone and install dependencies:
  ```sh
  brew install node@18
  git clone github.com/saucelabs/visual-examples
  cd visual-examples/wdio
  npm install
  ```

- Configure with your Sauce credentials from https://app.saucelabs.com/user-settings and run
  ```sh
  export SAUCE_USERNAME=__YOUR_SAUCE_USER_NAME__
  export SAUCE_ACCESS_KEY=__YOUR_SAUCE_ACCESS_KEY__
  export SAUCE_REGION=us-west-1 # change this only if you are not on the default US-WEST region

  npm run sauce-visual
  ```

- Review your screenshots by clicking on the url printed in the test or go to https://app.saucelabs.com/visual/builds.
- Accept all diffs, so they become new baselines.

- Re-run the tests
  ```sh
  npm run sauce-visual-modified
  ```

- Open the test or go to https://app.saucelabs.com/visual/builds to review changes.


## How to add visual testing to your setup

- Add sauce visual dependency
  ```sh
  npm install --save @saucelabs/wdio-sauce-visual-service
  ```

- Add the SauceVisualService to your `wdio.conf.(js|ts)`:
  ```ts
  import { SauceVisualService } from '@saucelabs/wdio-sauce-visual-service'
  ...
  export const config: Options.Testrunner = {
  ...
      services: ['sauce', [SauceVisualService, {}]],
  ...
  }
  ```

- Add a check to one of your tests:
  ```ts
      describe('Login Flow', () => {
          it('should login with valid credentials', async () => {
              ...
              await browser.check('My Login Page')
              ...
          });
      })
  ```

- Configure with your Sauce credentials from https://app.saucelabs.com/user-settings.
  ```sh
  export SAUCE_USERNAME=__YOUR_SAUCE_USER_NAME__
  export SAUCE_ACCESS_KEY=__YOUR_SAUCE_ACCESS_KEY__
  export SAUCE_REGION=us-west-1 # change this only if you are not on the default US-WEST region
  ```

- Run the test the way you are used to.
