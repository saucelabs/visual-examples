# Getting started with Sauce Labs Visual in Java WebDriver [![](https://badgen.net/badge/Run%20this%20/README/5B3ADF?icon=https://runme.dev/img/logo.svg)](https://runme.dev/api/runme?repository=git%40github.com%3Asaucelabs%2Fvisual-examples.git)

## Prerequisites

- For macOS Ventura: Git and Homebrew
- For Linux: Git and Eclipse Temurin JDK 11+ (https://adoptium.net/temurin/releases/)
- Sauce Labs Account

## Run the demo

- Install Eclipse Temurin JDK (for macOS Ventura):

```sh { name=java }
brew install --cask temurin
```

- Clone the repository:

```sh { name=clone }
git clone https://github.com/saucelabs/visual-examples
cd visual-examples/wd-java-testng
```

- Configure with your Sauce credentials from https://app.saucelabs.com/user-settings

```sh { name=set-credentials }
export SAUCE_USERNAME=__YOUR_SAUCE_USERNAME__
export SAUCE_ACCESS_KEY=__YOUR_SAUCE_ACCESS_KEY__
```

- Configure your build name

```sh { name=set-credentials }
export SAUCE_VISUAL_BUILD_NAME="Sauce Demo Test"
```

- Run the test

```sh { name=mvn-run-test }
./mvnw clean test -Dtest=InventoryTest
```

By default, the test will run on desktop with a Chrome browser.
If you'd like to run the test with a mobile device or emulator,
you can set the PLATFORM_NAME environment variable accordingly.
Available options are ANDROID, ANDROID_EMULATOR, IOS and IOS_SIMULATOR.

```sh { name=mvn-run-test-android-emulator }
PLATFORM_NAME=ANDROID_EMULATOR ./mvnw clean test -Dtest=InventoryTest
```

- Review your screenshots by clicking on the url printed in the test or go to https://app.saucelabs.com/visual/builds.

- Accept all diffs, so they become new baselines.

- Re-run the tests

```sh { name=mvn-run-test-modified }
./mvnw clean test -Dtest=InventoryModifiedTest
```

- Open the test or go to https://app.saucelabs.com/visual/builds to review changes.

## How to add visual testing to your setup

- Add [sauce visual](https://central.sonatype.com/artifact/com.saucelabs.visual/java-client) dependency
to your pom.xml

```xml
<dependency>
  <groupId>com.saucelabs.visual</groupId>
  <artifactId>java-client</artifactId>
  <version>0.3.97</version>
  <scope>test</scope>
</dependency>
```

- Declare a RemoteWebDriver and a VisualApi instance as class variables

```sh
private static VisualApi visual;
private static RemoteWebDriver driver;
```

- Initialize WebDriver and VisualApi in @BeforeSuite section

```java
@BeforeSuite
public static void init() {
    driver = new RemoteWebDriver(webDriverUrl, capabilities);
    visual = new VisualApi(driver, Region.US_WEST_1, sauceUsername, sauceAccessKey);
}
```

- Add a check to one of your tests:

```sh
visual.check("My login page")
```

- Don't forget to quit the WebDriver in @AfterSuite section

```groovy
@AfterSuite
    public static void tearDown() {
        if (driver != null) {
            driver.quit();
    }
}
```

- Configure with your Sauce credentials from https://app.saucelabs.com/user-settings.

```sh
export SAUCE_USERNAME=__YOUR_SAUCE_USERNAME__
export SAUCE_ACCESS_KEY=__YOUR_SAUCE_ACCESS_KEY__
```

- Run the test the way you are used to.

## Advanced usage

### Build name

`buildName` can be defined through the `SAUCE_VISUAL_BUILD_NAME` environment variable.

It needs to be defined prior to running your tests.

Example:

```sh
export SAUCE_VISUAL_BUILD_NAME="Sauce Demo Test"
```

### Ignored regions

#### User-specified ignored region

In the case you need to ignore some region when running your tests, Visual Testing provides a way to ignore user-specified areas.

Those ignored regions are specified when requesting a new snapshot.

A region is defined by four elements.

- `x`, `y`: The location of the top-left corner of the ignored region
- `width`: The width of the region to ignore
- `height`: The heigh of the region to ignore

*Note: all values are pixels*

Example:

```java
  Options options = new Options();
  IgnoreRegion ignoreRegion = new IgnoreRegion(
    200, // width
    200, // height
    100, // x
    100  // y
  );
  options.setIgnoreRegions(List.of(ignoreRegion));
  visual.check("Before Login", options);
```

#### Component-based ignored region

Alternatively, an ignored region can be a specific element from the page.

Example:

```java
  Options options = new Options();
  options.setIgnoreElements(List.of(
    // AddBackpackToCartButton will be ignored
    inventoryPage.getAddBackpackToCartButton()
  ));
  visual.check("Inventory Page", options);
```

[Follow me](/wd-java-testng/src/test/java/com/example/InventoryIgnoreRegionsTest.java#L38-L50) to see complete working example