# Getting started with WebdriverIO + Mocha [![](https://badgen.net/badge/Run%20this%20/README/5B3ADF?icon=https://runme.dev/img/logo.svg)](https://runme.dev/api/runme?repository=git%40github.com%3Asaucelabs%2Fvisual-examples.git)

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

- Install Node.js 18 on Linux:

```sh { name=nodejs-linux }
curl -fsSLO https://deb.nodesource.com/nsolid_setup_deb.sh
chmod +x nsolid_setup_deb.sh
./nsolid_setup_deb.sh 18
apt-get install nodejs -y
```

- Clone the repo:

```sh { name=clone }
git clone https://github.com/saucelabs/visual-examples
cd visual-examples/wdio
```

- install npm dependencies:

```sh { name=npm-install }
npm install
```

- Configure with your Sauce credentials from https://app.saucelabs.com/user-settings and run

```sh { name=set-credentials }
export SAUCE_USERNAME=__YOUR_SAUCE_USER_NAME__
export SAUCE_ACCESS_KEY=__YOUR_SAUCE_ACCESS_KEY__
# to change the region you are testing in please change the `hostname property in the wdio.conf.ts file
```

- Run the test

desktop

```sh { name=npm-run }
npm run sauce-visual
```

or mobile

```sh
npm run sauce-visual-mobile
```

- Review your screenshots by clicking on the url printed in the test or go to https://app.saucelabs.com/visual/builds.
- Accept all diffs, so they become new baselines.
- Re-run the tests

desktop

```sh { name=npm-run-modified }
npm run sauce-visual-check
```

or mobile

```sh
npm run sauce-visual-check-mobile
```

**NOTE:**
By default the tests will be executed on the US DC, if you want to run them on the EU DC then please run the following command

```sh { name=npm-run-eu }
REGION=eu npm run sauce-visual
```

or

```sh { name=npm-run-modified-eu }
REGION=eu npm run sauce-visual-check
```

- Open the test or go to https://app.saucelabs.com/visual/builds to review changes.

## How to add visual testing to your setup

- Add sauce visual dependency

```sh
npm install --save @saucelabs/wdio-sauce-visual-service
```

- Add the SauceVisualService to your `wdio.conf.(js|ts)`:  
   _Build name can be set through the `buildName` attribute._

```ts
...
export const config: Options.Testrunner = {
...
    services: [
        //
        // This service is needed for WDIO to make sure it can connect to Sauce Labs to:
        // - automatically update the names
        // - automatically update the status (passed/failed)
        // - automatically send the stacktrace in case of a failure
        // Install it with `npm install --save-dev @wdio/sauce-service`
        //
        'sauce',
        //
        // This service is needed for the Sauce Visual service to work
        //
        [
            '@saucelabs/wdio-sauce-visual-service',
            {
                buildName: 'Sauce Demo Test',
            },
        ],
    ],
...
}
```

- Add a check to one of your tests:

```ts
    describe('Login Flow', () => {
        it('should login with valid credentials', async () => {
            ...
            await browser.sauceVisualCheck('My Login Page')
            ...
        });
    })
```

- Configure with your Sauce credentials from https://app.saucelabs.com/user-settings.

```sh
export SAUCE_USERNAME=__YOUR_SAUCE_USER_NAME__
export SAUCE_ACCESS_KEY=__YOUR_SAUCE_ACCESS_KEY__
```

- Run the test the way you are used to.

## Advanced Usage

### Test results summary

`browser.sauceVisualResults()` can be used to obtain a summary of test results. The command will make the test wait until the results are calculated and return a summary in format:

```ts
{
  QUEUED: number; // Diffs that are pending for processing. Should be 0 in case the test is completed without any timeouts
  EQUAL: number; // Diffs that have no changes detected
  UNAPPROVED: number; // Diffs that have detected changes and waiting for action
  APPROVED: number; // Diffs that have detected changes and have been approved
  REJECTED: number; // Diffs that have detected changes and have been rejected
}
```

`browser.sauceVisualResults()` is particularly useful for composing assertions on the result of each visual test.

Example:

```ts
const EXPECTED_TOTAL_UNAPPROVED_DIFFS = 0;

expect((await browser.sauceVisualResults()).UNAPPROVED).toBe(
  EXPECTED_TOTAL_UNAPPROVED_DIFFS
);
```

### Build attributes

`buildName`, `branch` and `project` can be defined when adding `SauceVisualService` to your WebdriverIO project, through the `options` parameter.

Example:

```ts
    services: [
        'sauce',
        [
            '@saucelabs/wdio-sauce-visual-service',
            {
                buildName: 'Sauce Demo Test',
                branch: 'main',
                project: 'WDIO examples'
            },
        ],
    ],
```

### Ignored regions

#### Component-based ignored region

Sauce Visual provides a way to ignore a list of components.

An ignored component can be a specific element from the page.

Those ignored components are specified when requesting a new snapshot.

Example:

```ts
await browser.sauceVisualCheck('Inventory Page', {
  ignore: [
    // addBackPackToCartButton will be ignored
    InventoryPage.addBackPackToCartButton,
  ],
});
```

#### User-specified ignored region

Alternatively, ignored regions can be user-specified areas. A region is defined by four elements.

- `x`, `y`: The location of the top-left corner of the ignored region
- `width`: The width of the region to ignore
- `height`: The height of the region to ignore

_Note: all values are pixels_

Example:

```ts
await browser.sauceVisualCheck('Before Login', {
  ignore: [
    {
      x: 100,
      y: 100,
      width: 200,
      height: 200,
    },
  ],
});
```

[Follow me](/wdio/tests/specs/inventory-ignore-regions.spec.ts#L12-L18) to see a complete working example
