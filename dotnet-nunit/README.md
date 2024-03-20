# Getting started with Sauce Labs Visual and C# WebDriver [![](https://badgen.net/badge/Run%20this%20/README/5B3ADF?icon=https://runme.dev/img/logo.svg)](https://runme.dev/api/runme?repository=git%40github.com%3Asaucelabs%2Fvisual-examples.git)

## Prerequisites

- Git and .NET 6.0
- Sauce Labs Account

## Run the demo

- Install .NET SDK (for Ubuntu):

```sh { name=dotnet-install }
apt-get install -y dotnet7
```

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

## How to add visual testing to your setup

- Add [sauce visual](https://www.nuget.org/packages/SauceLabs.Visual/) dependency
```powershell {"id":"01HHQ3FQDWBD7ZSD2PQKG2AKDZ"}
Install-Package SauceLabs.Visual
```

- Declare a RemoteWebDriver and a VisualApi instance as class variables

```csharp {"id":"01HHQ3FQDWBD7ZSD2PQQ2E5HSZ"}
using OpenQA.Selenium.Remote;
using SauceLabs.Visual;

private RemoteWebDriver Driver { get; set; }
private VisualClient VisualClient { get; set; }
```

- Initialize WebDriver and VisualApi in `[OneTimeSetUp]` method

```csharp {"id":"01HHQ3FQDWBD7ZSD2PQTRQSGV3"}
    [OneTimeSetUp]
    public async Task Setup()
    {
      var capabilities = GetCapabilities();

      Driver = new RemoteWebDriver(sauceUrl, capabilities);
      VisualClient = await VisualClient.Create(Driver, Region.UsWest1);
      // Enable Dom Capture
      VisualClient.CaptureDom = true;
    }
```

- Add a check to one of your tests:

```csharp {"id":"01HHQ3FQDWBD7ZSD2PQZQMJRH1"}
await VisualClient.VisualCheck("My login page")
```

- Don't forget to quit the WebDriver in @AfterAll section

```csharp {"id":"01HHQ3FQDWBD7ZSD2PR1PW1V54"}
    [OneTimeTearDown]
    public async Task Teardown()
    {
        Driver?.Quit();
        await VisualClient.Cleanup();
        VisualClient.Dispose();
    }
```

- Configure with your Sauce credentials from https://app.saucelabs.com/user-settings.

```sh {"id":"01HHQ3FQDWBD7ZSD2PR4Y27KEQ"}
export SAUCE_USERNAME=__YOUR_SAUCE_USERNAME__
export SAUCE_ACCESS_KEY=__YOUR_SAUCE_ACCESS_KEY__
```

- Run the test the way you are used to.

## Advanced usage

### Test results summary

`VisualClient.VisualResults()` returns a summary of test results in `Dictionnary<DiffStatus, int>` format where `DiffStatus` is one of the following:

- `DiffStatus.QUEUED`: Diffs that are pending for processing. Should be 0 in case the test is completed without any timeouts
- `DiffStatus.EQUAL`: Diffs that have no changes detected
- `DiffStatus.UNAPPROVED`: Diffs that have detected changes and waiting for action
- `DiffStatus.APPROVED`: Diffs that have detected changes and have been approved
- `DiffStatus.REJECTED`: Diffs that have detected changes and have been rejected

Sample usage:

```csharp
var expectedTotalUnapprovedDiffs = 0;

var results = await VisualClient.VisualResults();
Assert.AreEqual(expectedTotalUnapprovedDiffs, results[DiffStatus.Unapproved]);
```

### Build attributes

When creating the service in `VisualClient`, extra fields can be set to define the context, thus acting on which baselines new snapshots will be compared to. ([More info on baseline matching](../../visual-testing.md#baseline-matching))

It needs to be defined through a `CreateBuildOptions` object.

Properties available:
- `string? Name`: The name of the build
- `string? Project`: The name of the project
- `string? Branch`: The name of the branch
- `string? CustomId`: A customId to be able to retrieve the current build
- `string? DefaultBranch`: The name of the default branch

Example:

```csharp
  VisualClient = await VisualClient.Create(Driver, Region.UsWest1,
      new CreateBuildOptions() { Name = "My Visual Build", Project = "csharp-project", Branch = "feature-branch" });
```

### Ignored regions

#### Component-based ignored region

Sauce Visual provides a way to ignore a list of components.

An ignored component can be a specific element from the page.

Those ignored components are specified when requesting a new snapshot.

Example:

```csharp
var btnAction = Driver.FindElement(By.CssSelector(".app_logo"));

await VisualClient.VisualCheck("Inventory Page",
    new VisualCheckOptions()
    {
        IgnoreElements = new[] { btnAction }
    });
```

#### User-specified ignored region

Alternatively, ignored regions can be user-specified areas. A region is defined by four elements.

- `x`, `y`: The location of the top-left corner of the ignored region
- `width`: The width of the region to ignore
- `height`: The height of the region to ignore

_Note: all values are pixels_

Example:

```csharp
await VisualClient.VisualCheck("Inventory Page",
    new VisualCheckOptions()
    {
        IgnoreRegions = new[] { new IgnoreRegion(10, 10, 100, 100) }
    });
```

[Follow me](/wd-java/src/test/java/com/example/InventoryIgnoreRegionsTest.java#L38-L50) to see complete working example