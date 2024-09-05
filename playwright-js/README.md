# Getting started with Playwright

Included is a full setup for our recommended way of using Sauce Visual with Playwright using a custom fixture in `login.spec.ts`. We also include a `no-fixture.spec.ts` showing how to use Sauce Visual without a fixture if you have a mature codebase and don't want to change in bulk, or just want to test Visual out in a few key areas first.

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

- Configure with your Sauce credentials from https://app.saucelabs.com/user-settings and run

```sh { name=set-credentials }
export SAUCE_USERNAME=__YOUR_SAUCE_USER_NAME__
export SAUCE_ACCESS_KEY=__YOUR_SAUCE_ACCESS_KEY__
# You can change the region to upload to via the SAUCE_REGION env variable. See the
# docs for more details on how to customize your run.
```

- Run the test

```sh { name=npm-run }
npm run sauce-visual
```

- Go to https://app.saucelabs.com/visual/builds and select your latest run
- Accept all diffs, so they become new baselines.
- Re-run the tests
    `npm run sauce-visual-check`
- Open the test or go to https://app.saucelabs.com/visual/builds to review changes.
- It should detect changes and display differences between the two runs

## Installation & Usage

View installation and usage instructions on the [Sauce Docs website](https://docs.saucelabs.com/visual-testing/integrations/playwright/).
