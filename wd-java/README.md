---
runme:
  id: 01HHQ3FQDXM30MYSM6ZK6WSN7H
  version: v2.0
---

# Getting started with Sauce Labs Visual in Java WebDriver [![](https://badgen.net/badge/Run%20this%20/README/5B3ADF?icon=https://runme.dev/img/logo.svg)](https://runme.dev/api/runme?repository=git%40github.com%3Asaucelabs%2Fvisual-examples.git)

## Prerequisites

- For macOS Ventura: Git and Homebrew
- For Linux: Git and Eclipse Temurin JDK 8+ (https://adoptium.net/temurin/releases/)
- Sauce Labs Account

## Run the demo

- Install Eclipse Temurin JDK (for macOS Ventura):

```sh {"id":"01HHQ3FQDWBD7ZSD2PQ3DXPVY1","name":"java"}
brew install --cask temurin
```

- Clone the repository:

```sh {"id":"01HHQ3FQDWBD7ZSD2PQ7649M6Q","name":"clone"}
git clone https://github.com/saucelabs/visual-examples
cd visual-examples/wd-java
```

- Configure with your Sauce credentials from https://app.saucelabs.com/user-settings

```sh {"id":"01HHQ3FQDWBD7ZSD2PQAXX67AM","name":"set-credentials"}
export SAUCE_USERNAME=__YOUR_SAUCE_USERNAME__
export SAUCE_ACCESS_KEY=__YOUR_SAUCE_ACCESS_KEY__
```

- Run the test

```sh {"id":"01HHQ3FQDWBD7ZSD2PQEDEJ47V","name":"mvn-run-test"}
./mvnw clean test
```

By default, the test will run on desktop with a Chrome browser.
If you'd like to run the test with a mobile device or emulator,
you can set the PLATFORM_NAME environment variable accordingly.
Available options are ANDROID, ANDROID_EMULATOR, IOS and IOS_SIMULATOR.

```sh {"id":"01HHQ3FQDWBD7ZSD2PQFW90YT9","name":"mvn-run-test-android-emulator"}
PLATFORM_NAME=ANDROID_EMULATOR ./mvnw clean test
```

- Review your screenshots by clicking on the url printed in the test or go to https://app.saucelabs.com/visual/builds.
- Accept all diffs, so they become new baselines.
- Re-run the tests

```sh {"id":"01HHQ3FQDWBD7ZSD2PQK0ZT30D","name":"mvn-run-test-modified"}
./mvnw clean test -Dmodified=true
```

- Open the test or go to https://app.saucelabs.com/visual/builds to review changes.

## Installation & Usage

View installation and usage instructions on the [Sauce Docs website](https://docs.saucelabs.com/visual-testing/integrations/java/).
