# Getting started with XCUITest [![](https://badgen.net/badge/Run%20this%20/README/5B3ADF?icon=https://runme.dev/img/logo.svg)](https://runme.dev/api/runme?repository=git%40github.com%3Asaucelabs%2Fvisual-examples.git)

We provide an example test for our recommended way of using Sauce Visual with XCUITest
in [Sauce Labs Demo App](https://github.com/saucelabs/my-demo-app-ios/blob/main/MyDemoAppUITests/Tests/VisualTest.swift)

## Prerequisites

- macOS with Xcode 26 and an iOS Simulator
- Sauce Labs Account

## Run the demo with a local Simulator

- Clone the [Sauce Labs Demo App](https://github.com/saucelabs/my-demo-app-ios). The Sauce Visual SDK is already added to it as a Swift package.

```sh { name=clone }
git clone https://github.com/saucelabs/my-demo-app-ios.git
cd my-demo-app-ios
```

- Configure with your Sauce credentials from https://app.saucelabs.com/user-settings

```sh { name=set-credentials }
export SAUCE_USERNAME=__YOUR_SAUCE_USERNAME__
export SAUCE_ACCESS_KEY=__YOUR_SAUCE_ACCESS_KEY__
# By default, US region is used. To test on another region, use the following export command:
# export SAUCE_REGION=eu-central-1
```

- Run the test. The Simulator doesn't inherit your shell's variables, so pass them with the `TEST_RUNNER_` prefix. Without credentials, the tests are skipped.

```sh { name=xcodebuild-test }
TEST_RUNNER_SAUCE_USERNAME="$SAUCE_USERNAME" TEST_RUNNER_SAUCE_ACCESS_KEY="$SAUCE_ACCESS_KEY" \
TEST_RUNNER_SAUCE_REGION="$SAUCE_REGION" \
xcodebuild test -workspace "My Demo App.xcworkspace" -scheme "My Demo App" \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro' \
  -only-testing MyDemoAppUITests/VisualTest
```

- Go to https://app.saucelabs.com/visual/builds and select your latest build
- Accept all diffs, so they become new baselines.

- Rerun the test, this time passing `VISUAL_CHECK`. The test then logs in as `visual@example.com`, whose catalog has random prices, different images for both backpacks and a centred title.

```sh { name=xcodebuild-visual-test }
TEST_RUNNER_SAUCE_USERNAME="$SAUCE_USERNAME" TEST_RUNNER_SAUCE_ACCESS_KEY="$SAUCE_ACCESS_KEY" \
TEST_RUNNER_SAUCE_REGION="$SAUCE_REGION" TEST_RUNNER_VISUAL_CHECK=true \
xcodebuild test -workspace "My Demo App.xcworkspace" -scheme "My Demo App" \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro' \
  -only-testing MyDemoAppUITests/VisualTest
```

- Open the test or go to https://app.saucelabs.com/visual/builds to review changes.
- It should detect changes in the **Catalog - login** snapshot and display differences between the two runs

If the destination isn't found, list the available Simulators with `xcrun simctl list devices available` and use one of them.

## Run the demo from Xcode

- Open `My Demo App.xcworkspace` in Xcode
- In **Edit Scheme… → Run → Arguments**, add `SAUCE_USERNAME` and `SAUCE_ACCESS_KEY` under **Environment Variables**. The scheme's tests use them too.
- Run the tests with **Product → Test**
- Accept all diffs in https://app.saucelabs.com/visual/builds, add `VISUAL_CHECK` = `true` to the environment variables, and run the test again to see the changes

## Installation & Usage

View installation and usage instructions on the [Sauce Docs website](https://docs.saucelabs.com/visual-testing/integrations/xcuitest/).
