# Getting started with Sauce Labs Visual Java + iOS Native App  [![](https://badgen.net/badge/Run%20this%20/README/5B3ADF?icon=https://runme.dev/img/logo.svg)](https://runme.dev/api/runme?repository=git%40github.com%3Asaucelabs%2Fvisual-examples.git)

## Prerequisites

- For macOS Ventura: Git and Homebrew
- For Linux: Git and Eclipse Temurin JDK 8+ (https://adoptium.net/temurin/releases/)
- Sauce Labs Account

## Run the demo

- Install Eclipse Temurin JDK (for macOS Ventura):

```sh { "name":"java" }
brew install --cask temurin
```

- Clone the repository:

```sh { "name":"clone" }
git clone https://github.com/saucelabs/visual-examples
cd visual-examples/java-ios-app
```

- Configure with your Sauce credentials from https://app.saucelabs.com/user-settings

```sh { "name":"set-credentials" }
export SAUCE_USERNAME=__YOUR_SAUCE_USERNAME__
export SAUCE_ACCESS_KEY=__YOUR_SAUCE_ACCESS_KEY__
```

- Run the test

```sh { "name":"mvn-run-ios-test" }
./mvnw clean test
```

- Review your screenshots by clicking on the url printed in the test or go to https://app.saucelabs.com/visual/builds.
- Accept all diffs, so they become new baselines.
- Re-run the tests

```sh { "name":"mvn-run-ios-test-modified" }
VISUAL_CHECK=enabled ./mvnw clean test
```

- Open the test or go to https://app.saucelabs.com/visual/builds to review changes.


**NOTE**: If you'd like run the full page screenshot test additionally,
  you need to pass the environment variable FPS=enabled when running the test.

```sh { "name":"mvn-run-ios-test-fps" }
FPS=enabled ./mvnw clean test
```

## Installation & Usage

View installation and usage instructions on
the [Sauce Docs website](https://docs.saucelabs.com/visual-testing/integrations/java/).
