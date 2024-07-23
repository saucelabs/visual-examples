# Getting started with Nightwatch + CucumberJS Testrunner [![](https://badgen.net/badge/Run%20this%20/README/5B3ADF?icon=https://runme.dev/img/logo.svg)](https://runme.dev/api/runme?repository=git%40github.com%3Asaucelabs%2Fvisual-examples.git)

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
cd visual-examples/nightwatch/cucumberjs
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

## Installation & Usage

View installation and usage instructions on the [Sauce Docs website](https://docs.saucelabs.com/visual-testing/integrations/nightwatch/).
