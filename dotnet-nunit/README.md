# Getting started with Sauce Labs Visual and C# WebDriver [![](https://badgen.net/badge/Run%20this%20/README/5B3ADF?icon=https://runme.dev/img/logo.svg)](https://runme.dev/api/runme?repository=git%40github.com%3Asaucelabs%2Fvisual-examples.git)

## Prerequisites

- Git and .NET 6.0
- Sauce Labs Account

## Run the demo

- Clone the repository:

```sh
git clone https://github.com/saucelabs/visual-examples
cd visual-examples/dotnet-nunit
```

- Configure with your Sauce credentials from https://app.saucelabs.com/user-settings

```sh
export SAUCE_USERNAME=__YOUR_SAUCE_USERNAME__
export SAUCE_ACCESS_KEY=__YOUR_SAUCE_ACCESS_KEY__
```

- Run the test

```sh { name=dotnet-test }
dotnet test
```

- Review your screenshots by clicking on the url printed in the test or go to https://app.saucelabs.com/visual/builds.
- Accept all diffs, so they become new baselines.
- Re-run the tests

```sh { name=dotnet-test-modified }
MODIFIED=true dotnet test
```

- Open the test or go to https://app.saucelabs.com/visual/builds to review changes.

## Installation & Usage

View installation and usage instructions on the [Sauce Docs website](https://docs.saucelabs.com/visual-testing/integrations/csharp/).
