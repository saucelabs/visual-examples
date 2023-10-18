# Getting started with WebdriverIO [![](https://badgen.net/badge/Run%20this%20/README/5B3ADF?icon=https://runme.dev/img/logo.svg)](https://runme.dev/api/runme?repository=git%40github.com%3Asaucelabs%2Fvisual-examples.git)

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
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs
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
   *Build name can be set through the `buildName` attribute.*

```ts
...
export const config: Options.Testrunner = {
...
    services: ['sauce', ['@saucelabs/wdio-sauce-visual-service', {
        buildName: 'Sauce Demo Test',
    }]],
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
```

- Run the test the way you are used to.

## Advanced usage

### Build attributes

`buildName`, `branch` and `project` can be defined when adding `SauceVisualService` to you WebdriverIO project, through the `options` parameter.

Example:

```ts
    services: ['sauce', ['@saucelabs/wdio-sauce-visual-service', {
        buildName: 'Sauce Demo Test',
        branch: 'main',
        project: 'WDIO examples'
    }]],
```

### Ignored regions

#### User-specified ignored region

In the case you need to ignore some region when running your tests, Visual Testing provides a way to ignore user-specified areas.

Those ignored regions are specified when requesting a new snapshot.

A region is defined by four elements.

- `x`, `y`: The location of the top-left corner of the ignored region
- `width`: The width of the region to ignore
- `height`: The heigh of the region to ignore

*Note: all values are pixels*

Example:

```ts
await browser.check('Before Login', {
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

#### Component-based ignored region

Alternatively, an ignored region can be a specific element from the page.

Example:

```ts
    await browser.check('Inventory Page', {
        ignore: [
            // addBackPackToCartButton will be ignored
            InventoryPage.addBackPackToCartButton,
        ],
    });

```

[Follow me](/wdio/src/inventory-ignore-regions.spec.ts#L12-L18) to see complete working example