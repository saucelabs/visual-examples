# Getting started with Cypress [![](https://badgen.net/badge/Run%20this%20/README/5B3ADF?icon=https://runme.dev/img/logo.svg)](https://runme.dev/api/runme?repository=git%40github.com%3Asaucelabs%2Fvisual-examples.git)

## Prerequisites

- Your Sauce Labs Account credentials
- NodeJS 18+
- git

## Run the demo

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

## How to add visual testing to your setup

- Add plugin to your Cypress project

```sh
npm install --save @saucelabs/cypress-visual-plugin
```

- Add plugin in the project configuration, at the top of the file:
```ts
import CypressVisualPlugin from '@saucelabs/cypress-visual-plugin';

export default defineConfig({
  e2e: {
    [...]
    setupNodeEvents(on, config) {
      CypressVisualPlugin(on, config);
    },
  },
})
```

- Capture screenshot in one of your tests:

```ts
context('Sauce Demo', () => {
  it('.type() - type into a DOM element', () => {
    cy.visit('https://www.saucedemo.com/')

    cy.screenshot('visual: my-homepage');
  })
});
```

- Configure with your Sauce credentials from https://app.saucelabs.com/user-settings.

```sh
export SAUCE_USERNAME=__YOUR_SAUCE_USER_NAME__
export SAUCE_ACCESS_KEY=__YOUR_SAUCE_ACCESS_KEY__
```

- Run the test the way you are used to.
