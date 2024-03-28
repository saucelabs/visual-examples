---
runme:
  id: 01HHQ3F23DXXD7K4KP7GZ22YH8
  version: v2.0
---

# Getting started with Sauce Labs Visual in Java WebDriver [![](https://badgen.net/badge/Run%20this%20/README/5B3ADF?icon=https://runme.dev/img/logo.svg)](https://runme.dev/api/runme?repository=git%40github.com%3Asaucelabs%2Fvisual-examples.git)

## Prerequisites

- For macOS Ventura: Git and Homebrew
- For Linux: Git and Eclipse Temurin JDK 8+ (https://adoptium.net/temurin/releases/)
- Sauce Labs Account

## Run the demo

- Install Eclipse Temurin JDK (for macOS Ventura):

```sh {"id":"01HHQ3F23DXXD7K4KP6DSE2KTC","name":"java"}
brew install --cask temurin
```

- Clone the repository:

```sh {"id":"01HHQ3F23DXXD7K4KP6GV3P936","name":"clone"}
git clone https://github.com/saucelabs/visual-examples
cd visual-examples/wd-java-testng
```

- Configure with your Sauce credentials from https://app.saucelabs.com/user-settings

```sh {"id":"01HHQ3F23DXXD7K4KP6M1Z8Y3A","name":"set-credentials"}
export SAUCE_USERNAME=__YOUR_SAUCE_USERNAME__
export SAUCE_ACCESS_KEY=__YOUR_SAUCE_ACCESS_KEY__
```

- Run the test

```sh {"id":"01HHQ3F23DXXD7K4KP6NW3XF0Y","name":"mvn-run-test"}
./mvnw clean test -Dtest=InventoryTest
```

By default, the test will run on desktop with a Chrome browser.
If you'd like to run the test with a mobile device or emulator,
you can set the PLATFORM_NAME environment variable accordingly.
Available options are ANDROID, ANDROID_EMULATOR, IOS and IOS_SIMULATOR.

```sh {"id":"01HHQ3F23DXXD7K4KP6QWD7HYG","name":"mvn-run-test-android-emulator"}
PLATFORM_NAME=ANDROID_EMULATOR ./mvnw clean test -Dtest=InventoryTest
```

- Review your screenshots by clicking on the url printed in the test or go to https://app.saucelabs.com/visual/builds.
- Accept all diffs, so they become new baselines.
- Re-run the tests

```sh {"id":"01HHQ3F23DXXD7K4KP6RQTQ72G","name":"mvn-run-test-modified"}
./mvnw clean test -Dmodified=true -Dtest=InventoryTest
```

- Open the test or go to https://app.saucelabs.com/visual/builds to review changes.

## How to add visual testing to your setup

- Add [sauce visual](https://central.sonatype.com/artifact/com.saucelabs.visual/java-client) dependency
   to your pom.xml

```xml {"id":"01HHQ3F23DXXD7K4KP6VJ4Z5G4"}
<dependency>
  <groupId>com.saucelabs.visual</groupId>
  <artifactId>java-client</artifactId>
  <version>LATEST VERSION</version>
  <scope>test</scope>
</dependency>
```
*Latest available version can be found [here](https://search.maven.org/search?q=g:com.saucelabs.visual%20AND%20a:java-client)*

- Declare a RemoteWebDriver and a VisualApi instance as class variables

```java {"id":"01HHQ3F23DXXD7K4KP6WQM2PR0"}
private static VisualApi visual;
private static RemoteWebDriver driver;
```

- Initialize WebDriver and VisualApi in @BeforeSuite section

```java {"id":"01HHQ3F23DXXD7K4KP6YG44X4D"}
    @BeforeSuite
    public static void init() {
        driver = new RemoteWebDriver(webDriverUrl, capabilities);
        visual = new VisualApi.Builder(driver, sauceUsername, sauceAccessKey, DataCenter.US_WEST_1).build();
    }
```

- Add the test meta info listener to your test classes

```java {"id":"01HHQ3F23DXXD7K4KP6YK3595X"}
import com.saucelabs.visual.testng.TestMetaInfoListener;
import org.testng.annotations.Listeners;

@Listeners({TestMetaInfoListener.class})
public class MyTestNGTestClass {
    ...
}
```

- Add a check to one of your tests:

```java {"id":"01HHQ3F23DXXD7K4KP71EZ6YBA"}
visual.sauceVisualCheck("My login page")
```

- Don't forget to quit the WebDriver in @AfterSuite section

```java {"id":"01HHQ3F23DXXD7K4KP71STN3PF"}
    @AfterSuite
    public static void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
```

- Configure with your Sauce credentials from https://app.saucelabs.com/user-settings.

```sh {"id":"01HHQ3F23DXXD7K4KP756WJ21R"}
export SAUCE_USERNAME=__YOUR_SAUCE_USERNAME__
export SAUCE_ACCESS_KEY=__YOUR_SAUCE_ACCESS_KEY__
```

- Run the test the way you are used to.

## Advanced usage

### Test results summary

`VisualApi#sauceVisualResults()` can be used to obtain a summary of test results. The command will make the test wait until the results are calculated and return a summary of `Map<DiffStatus, Integer>` where `DiffStatus` is one of the following:

- `DiffStatus.QUEUED`: Diffs that are pending for processing. Should be 0 in case the test is completed without any timeouts
- `DiffStatus.EQUAL`: Diffs that have no changes detected
- `DiffStatus.UNAPPROVED`: Diffs that have detected changes and waiting for action
- `DiffStatus.APPROVED`: Diffs that have detected changes and have been approved
- `DiffStatus.REJECTED`: Diffs that have detected changes and have been rejected

`VisualApi#sauceVisualResults()` is particularly useful for composing assertions on the result of each visual test.

Example:

```java {"id":"01HHQ3F23DXXD7K4KP76DQRFMY"}
    import static org.testng.Assert.assertEquals;
    [...]
    
    var EXPECTED_TOTAL_UNAPPROVED_DIFFS = 0;

    assertEquals(visual.sauceVisualResults().get(DiffStatus.UNAPPROVED), EXPECTED_TOTAL_UNAPPROVED_DIFFS);
```

### Build attributes

When creating the service in `VisualApi`, extra fields can be set to define the context.

It needs to be defined through the `VisualApi.Builder` object.

Methods available:

- `withBuild(String build)`: Sets the name of the build
- `withProject(String project)`: Sets the name of the project
- `withBranch(String branch)`: Sets the name of the branch

Example:

```java {"id":"01HHQ3F23DXXD7K4KP787YF7NF"}
    visual = new Builder(driver, sauceUsername, sauceAccessKey, DataCenter.US_WEST_1)
            .withBuild("Sauce Demo Test")
            .withBranch("main")
            .withProject("TestNG + WebDriver examples for " + System.getenv("SAUCE_USERNAME"))
            .build();
```

### Ignored regions

#### Component-based ignored region

Sauce Visual provides a way to ignore a list of components.

An ignored component can be a specific element from the page.

Those ignored components are specified when requesting a new snapshot.

Example:

```java {"id":"01HHQ3F23DXXD7K4KP7B8GA05P"}
    Options options = new Options();
    options.setIgnoreElements(List.of(
        // AddBackpackToCartButton will be ignored
        inventoryPage.getAddBackpackToCartButton()
    ));
    visual.sauceVisualCheck("Inventory Page", options);
```

#### User-specified ignored region

Alternatively, ignored regions can be user-specified areas. A region is defined by four elements.

- `x`, `y`: The location of the top-left corner of the ignored region
- `width`: The width of the region to ignore
- `height`: The height of the region to ignore

*Note: all values are pixels*

Example:

```java {"id":"01HHQ3F23DXXD7K4KP7F5Y6STP"}
    Options options = new Options();
    IgnoreRegion ignoreRegion = new IgnoreRegion(
        100, // x
        100, // y
        200, // width
        200  // height
    );
    options.setIgnoreRegions(List.of(ignoreRegion));
    visual.sauceVisualCheck("Before Login", options);
```

[Follow me](/wd-java-testng/src/test/java/com/example/InventoryIgnoreRegionsTest.java#L38-L50) to see complete working example