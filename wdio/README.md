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

```sh { name=npm-run }
npm run sauce-visual
```

- Review your screenshots by clicking on the url printed in the test or go to https://app.saucelabs.com/visual/builds.
- Accept all diffs, so they become new baselines.
- Re-run the tests

```sh { name=npm-run-modified }
npm run sauce-visual-modified
```

- Open the test or go to https://app.saucelabs.com/visual/builds to review changes.

## How to add visual testing to your setup

- Add sauce visual dependency

```sh
echo "@saucelabs:registry=https://artifactory.tools.saucelabs.net/artifactory/api/npm/all-npm" >> .npmrc
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
```

- Run the test the way you are used to.
