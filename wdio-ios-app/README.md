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
# By default, US region is used. To test on another region, use the following export command:
# export SAUCE_REGION=eu-central-1
```

```

- Upload application binary using `saucectl`

For Real Devices:
```sh { name=upload-binary }
npx saucectl storage upload ./app/SauceLabs-Demo-App.ipa
```

- Get the file ID and export it to the env
```sh { name=set-file-id }
export APP_FILEID=<file-ID-returned-by-saucectl>
```


For Simulators:
```sh { name=upload-binary-simulators }
npx saucectl storage upload ./app/SauceLabs-Demo-App.Simulator.ipa
```

- Get the file ID and export it to the env
```sh { name=set-file-id-simulators }
export SIMULATOR_APP_FILEID=<file-ID-returned-by-saucectl>
```

- Run the test

On a Real Device:
```sh { name=npm-run-realdevice }
npm run sauce-visual
```

On a Simulator:

```sh { name=npm-run-simulator }
npm run sauce-visual-simulator
```

- Review your screenshots by clicking on the url printed in the test or go to https://app.saucelabs.com/visual/builds.
- Accept all diffs, so they become new baselines.
- Re-run the tests

On a Real Device:
```sh { name=npm-run-realdevice-modified }
npm run sauce-visual-check
```

On a Simulator:
```sh { name=npm-run-simulator-modified }
npm run sauce-visual-simulator-check
```

- Open the test or go to https://app.saucelabs.com/visual/builds to review changes.

## Installation & Usage

View installation and usage instructions on the [Sauce Docs website](https://docs.saucelabs.com/visual-testing/integrations/webdriverio/).
