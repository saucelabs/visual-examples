# Getting started with Espresso

We provide an example test for our recommended way of using Sauce Visual with Espresso
in [Sauce Labs Demo App](https://github.com/saucelabs/my-demo-app-android/blob/main/app/src/androidTest/java/com/saucelabs/mydemoapp/android/view/activities/VisualTest.java)

## Prerequisites

- Android Studio Koala | 2024.1.1 and above
- Sauce Labs Account

## Run the demo with Local Emulator

- Open [Sauce Labs Demo App](https://github.com/saucelabs/my-demo-app-android) with Android Studio

- Configure with your Sauce credentials from https://app.saucelabs.com/user-settings

```sh { name=set-credentials }
export SAUCE_USERNAME=__YOUR_SAUCE_USERNAME__
export SAUCE_ACCESS_KEY=__YOUR_SAUCE_ACCESS_KEY__
```

- Start a local emulator with Android Studio

- Run the test

```sh { name=gradle-test }
./gradlew connectedAndroidTest \
-Pandroid.testInstrumentationRunnerArguments.class=com.saucelabs.mydemoapp.android.view.activities.VisualTest
```

- Go to https://app.saucelabs.com/visual/builds and select your latest build
- Accept all diffs, so they become new baselines.

- Rerun the test, this time passing the `visualCheck` parameter

```sh { name=gradle-visual-test }
./gradlew connectedAndroidTest \
-Pandroid.testInstrumentationRunnerArguments.class=com.saucelabs.mydemoapp.android.view.activities.VisualTest \
-Pandroid.testInstrumentationRunnerArguments.visualCheck=true
```

- Open the test or go to https://app.saucelabs.com/visual/builds to review changes.
- It should detect changes and display differences between the two runs

## Run the demo with `saucectl`

Alternatively, you can run the demo on Sauce Labs instead of your local emulator.

- Install saucectl

```sh { name=npm-install-saucectl}
npm install saucectl
```

- Run saucectl

```sh { name=saucectl-run }
npx saucectl run
```

- Review your screenshots by clicking on the url printed in the test or go to https://app.saucelabs.com/visual/builds.
- Accept all diffs, so they become new baselines.

- Run saucectl with `VISUAL_CHECK` environment variable

```sh { name=saucectl-run-visual-check }
VISUAL_CHECK=true npx saucectl run
```

- Go to https://app.saucelabs.com/visual/builds to review changes.

## Installation & Usage

View installation and usage instructions on the [Sauce Docs website](https://docs.saucelabs.com/visual-testing/integrations/espresso/).
