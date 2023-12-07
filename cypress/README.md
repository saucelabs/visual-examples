# Getting started with Cypress [![](https://badgen.net/badge/Run%20this%20/README/5B3ADF?icon=https://runme.dev/img/logo.svg)](https://runme.dev/api/runme?repository=git%40github.com%3Asaucelabs%2Fvisual-examples.git)

## Prerequisites

- OSX Ventura with Git and Brew
- Linux with bash curl and git
- Windows with NodeJS 18 (untested)
- Sauce Labs Account

## Run the demo

- Install Node.js 18 on Mac:

```sh { name=nodejs-mac }
brew install node@18
```

- Install Node.js 18 + Dependencies on Linux:

```sh { name=nodejs-linux }
curl -fsSLO https://deb.nodesource.com/nsolid_setup_deb.sh
chmod +x nsolid_setup_deb.sh
./nsolid_setup_deb.sh 18
apt-get install nodejs -y
apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
```

- Clone the repo:

```sh { name=clone }
git clone https://github.com/saucelabs/visual-examples
cd visual-examples/cypress
```

- install npm dependencies:

```sh { name=npm-install }
npm install
```

- Configure with your Sauce credentials from https://app.saucelabs.com/user-settings and run

```sh { name=set-credentials }
export SAUCE_USERNAME=__YOUR_SAUCE_USER_NAME__
export SAUCE_ACCESS_KEY=__YOUR_SAUCE_ACCESS_KEY__
# to change the region you are testing in please change the `region` property in the cypress.config.ts file.
```

- Run the test

```sh { name=npm-run }
npm run cypress
```

- Review your screenshots by clicking on the url printed in the test or go to https://app.saucelabs.com/visual/builds.
- Accept all diffs, so they become new baselines.
- Re-run the tests

```sh { name=npm-run-modified }
npm run cypress-modified
```

- Open the test or go to https://app.saucelabs.com/visual/builds to review changes.
- It should detect changes. Reject diffs.
- Run modified test with ignore regions.
```sh { name=npm-run-ignored }
npm run cypress-ignored
```
- Open the test or go to https://app.saucelabs.com/visual/builds to review changes.
- Build should passed with "No changes" status.

## Running with `saucectl`

Alternatively, you can run your tests on Sauce Labs.

- Install `saucectl`
```sh { name=npm-install-saucectl}
npm install saucectl
```

- Install the plugin in your `.sauce/config.yml`
```yml
[...]

npm:
  packages:
    "@saucelabs/cypress-visual-plugin": "^0.3.33"

[...]
```

- Run saucectl
```sh { name=saucectl-run }
npx saucectl run
```

- Review your screenshots by clicking on the url printed in the test or go to https://app.saucelabs.com/visual/builds.
- Accept all diffs, so they become new baselines.

- Run saucectl (with a modified screen)
```sh { name=saucectl-run-modified }
npm run copy-locked
npx saucectl run
```

- Go to https://app.saucelabs.com/visual/builds to review changes.

## How to add visual testing to your setup

- Add plugin to your Cypress project

```sh
npm install --save @saucelabs/cypress-visual-plugin
```

- Add plugin in the project configuration, at the top of the file:
```ts
import { CypressSauceVisual } from '@saucelabs/cypress-visual-plugin';

export default defineConfig({
  e2e: {
    [...]
    setupNodeEvents(on, config) {
      CypressSauceVisual.register(on, config);
    },
  },
})
```

- Register Sauce Visual for Cypress commands. Add the following line in your `cypress/support/e2e.ts`:
```ts
import '@saucelabs/cypress-visual-plugin/commands';
```

- Capture screenshot in one of your tests:

```ts
context('Sauce Demo', () => {
  it('.type() - type into a DOM element', () => {
    cy.visit('https://www.saucedemo.com/')

    cy.visualCheck('visual: my-homepage');
  })
});
```

- Configure with your Sauce credentials from https://app.saucelabs.com/user-settings.

```sh
export SAUCE_USERNAME=__YOUR_SAUCE_USER_NAME__
export SAUCE_ACCESS_KEY=__YOUR_SAUCE_ACCESS_KEY__
```

- Run the test the way you are used to.


## Advanced usage

### Test results summary

`cy.sauceVisualResults()` can be used to obtain a summary of test results. The command will make the test wait until the results are calculated and return a summary in format:
```ts
    {
        QUEUED: number; // Diffs that are pending for processing. Should be 0 in case the test is completed without any timeouts
        EQUAL: number; // Diffs that have no changes detected
        UNAPPROVED: number; // Diffs that have detected changes and waiting for action
        APPROVED: number; // Diffs that have detected changes and have been approved
        REJECTED: number; // Diffs that have detected changes and have been rejected
    }
```

`cy.sauceVisualResults()` is particularly useful for composing assertions on the result of each visual test.

Example:
```ts
    const EXPECTED_TOTAL_UNAPPROVED_DIFFS = 0;

    cy.sauceVisualResults().its("UNAPPROVED").should("eq", EXPECTED_TOTAL_UNAPPROVED_DIFFS);
```

### Build name

`buildName` can be defined in the `cypress.config.js` configuration file.

Example
```javascript
export default defineConfig({
  e2e: {
    [...]
    saucelabs: {
      buildName: 'SauceDemo - Cypress',
    },
    [...]
  }
}
```

### Project

`project` can be defined in the `cypress.config.js` configuration file.

Example
```javascript
export default defineConfig({
  e2e: {
    [...]
    saucelabs: {
      project: process.env.GITHUB_REPOSITORY,
    },
    [...]
  }
}
```

### Branch

`branch` can be defined in the `cypress.config.js` configuration file.

Example
```javascript
export default defineConfig({
  e2e: {
    [...]
    saucelabs: {
      branch: process.env.GITHUB_REF_NAME,
    },
    [...]
  }
}
```

### Region

By default, visual tests are uploaded to `us-west-1` region. \
This value can be overridden in the `cypress.config.js` configuration file.

Example
```javascript
export default defineConfig({
  e2e: {
    [...]
    saucelabs: {
      regionbuildName: 'eu-central-1',
    },
    [...]
  }
}
```

### Ignored regions

#### Component-based ignored region

Sauce Visual provides a way to ignore a list of components.

An ignored component can be a specific element from the page.

Those ignored components are specified when requesting a new snapshot.

Example:

```javascript
    cy.visualCheck('login-page', { ignoredRegions: [
      cy.get('[data-test="username"]'),
    ] });
```

#### User-specified ignored region

Alternatively, ignored regions can be user-specified areas. A region is defined by four elements.

- `x`, `y`: The location of the top-left corner of the ignored region
- `width`: The width of the region to ignore
- `height`: The height of the region to ignore

*Note: all values are pixels*

Example:

```javascript
    cy.visualCheck('login-page', { ignoredRegions: [
      {
        x: 240,
        y: 800,
        width: 1520,
        height: 408
      }
    ] });
```

## Limitations

Sauce Visual plugin for Cypress **DOES NOT** support `cypress open`.

Screenshots will be captured and sent to Sauce Labs only when `cypress run` is executed.
