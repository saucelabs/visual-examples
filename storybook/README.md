# Getting started with Storybook

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

- Start Storybook locally in a separate terminal window and leave running in the background

```sh { name=start-storybook }
npm run storybook
```

- Configure with your Sauce credentials from https://app.saucelabs.com/user-settings and run

```sh { name=set-credentials }
export SAUCE_USERNAME=__YOUR_SAUCE_USER_NAME__
export SAUCE_ACCESS_KEY=__YOUR_SAUCE_ACCESS_KEY__
# You can change the region to upload to via the SAUCE_REGION env variable. See the 
# @saucelabs/visual-storybook README for more details on how to customize your run. 
```

- Run the test

```sh { name=npm-run }
npm run test-storybook
```

- Go to https://app.saucelabs.com/visual/builds and select your latest Storybook run
- Accept all diffs, so they become new baselines.
- Make some changes in one of the Storybook Stories

For an example, let's make the following changes in `visual-storybook/src/stories/Button.stories.ts`:
- Comment out / remove the 'size' arg in line 40
- Update the label in line 48 from 'Button' to 'Button Small'


- Re-run the tests
- Open the test or go to https://app.saucelabs.com/visual/builds to review changes.
- It should detect changes and display differences between the two runs of the various stories
