# Getting started with Nightwatch + Mocha [![](https://badgen.net/badge/Run%20this%20/README/5B3ADF?icon=https://runme.dev/img/logo.svg)](https://runme.dev/api/runme?repository=git%40github.com%3Asaucelabs%2Fvisual-examples.git)

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
cd visual-examples/nightwatch/mocha
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

- Review your screenshots by clicking on the url printed in the test or go to https://app.saucelabs.com/visual/builds.
- Accept all diffs, so they become new baselines.
- Re-run the tests

desktop

```sh { name=npm-run-modified }
npm run sauce-visual-check
```

**NOTE:**
By default the tests will be executed on the US DC, if you want to run them on the EU DC then please run the following command

```sh { name=npm-run-eu }
SAUCE_REGION=eu-central-1 npm run sauce-visual
```

or

```sh { name=npm-run-modified-eu }
SAUCE_REGION=eu-central-1 npm run sauce-visual-check
```

- Open the test or go to https://app.saucelabs.com/visual/builds to review changes.

## How to add visual testing to your setup

- Add sauce visual dependency

```sh
npm install --save @saucelabs/nightwatch-sauce-visual-service
```

- Add the SauceVisualService to your `nightwatch.conf.(js|ts)`:  
   _Build name can be set through the `buildName` attribute._

```ts
module.exports = {
  // ...
  // Add the service
  plugins: [
    // ... other plugins
    '@saucelabs/nightwatch-sauce-visual-service',
  ],
  // ...
  test_settings: {
    // ...
    default: {
      // ...
      sauceVisualService: {
        buildName: 'Nightwatch Visual Demo Test',
        project: 'Nightwatch Project',
        branch: 'main',
      },
      // ...
    },
    // ...
  },
  // ...
};
```

- Add a check to one of your tests:

```js
describe('Saucedemo example', function () {
  it('Check Home Page - 1', (browser) => {
    browser
      .url('https://saucedemo.com')
      // NOTE: adding the `this` context is required for the service
      // to properly pass the suite and test name to Sauce Labs Visual
      .sauceVisualCheck('Home Page - 1', this);
  });
});
```

- Configure with your Sauce credentials from https://app.saucelabs.com/user-settings.

```sh
export SAUCE_USERNAME=__YOUR_SAUCE_USER_NAME__
export SAUCE_ACCESS_KEY=__YOUR_SAUCE_ACCESS_KEY__
```

- Run the test the way you are used to.

## Docs

- [Nightwatch](https://nightwatchjs.org/)
- [Sauce Labs Visual](https://docs.saucelabs.com/visual-testing)
- [Nightwatch Sauce Visual Service](https://docs.saucelabs.com/visual-testing/integrations/nightwatch)
