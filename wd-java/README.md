# Getting started with WebDriver

## Prerequisites

- Mac System - Ventura
- Sauce Labs Account
- Git
- Homebrew

## Run the demo

- Install java:
  ```sh { name=java }
  brew install java
  ```

- Clone the repository:
  ```sh { name=clone }
  git clone https://github.com/saucelabs/visual-examples
  cd visual-examples/wd-java
  ```

- Configure with your Sauce credentials from https://app.saucelabs.com/user-settings and run
  ```sh {name=}
  export SAUCE_USERNAME=__YOUR_SAUCE_USER_NAME__
  export SAUCE_ACCESS_KEY=__YOUR_SAUCE_ACCESS_KEY__

  ./mvnw clean test -Dtest=InventoryTest
  ```

- Review your screenshots by clicking on the url printed in the test or go to https://app.saucelabs.com/visual/builds.
- Accept all diffs, so they become new baselines.

- Re-run the tests
  ```sh
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
    <version>0.2.5</version>
    <scope>test</scope>
  </dependency>
  ```

- Declare a RemoteWebDriver and a VisualApi instance as class variables
  ```
  private static VisualApi visual;
  private static RemoteWebDriver driver;
  ```

- Initialize WebDriver and VisualApi in @BeforeAll section
  ```
  @BeforeAll
  public static void init() throws MalformedURLException {
      DesiredCapabilities caps = new DesiredCapabilities();
      caps.setBrowserName("chrome");
      // WD_URL should look like https://<SAUCE_USERNAME>:<SAUCE_ACCESS_KEY>@ondemand.us-west-1.saucelabs.com:443/wd/hub
      driver = new RemoteWebDriver(new URL(WD_URL), caps);
      visual = VisualApi.forProductionUsWest(driver);
  }
  ```

- Add a check to one of your tests:
  ```
  visual.check("My login page")
  ```

- Don't forget to quit the WebDriver in @AfterAll section
  ```
  @AfterAll
      public static void tearDown() {
          if (driver != null) {
              driver.quit();
      }
  }
  ```

- Configure with your Sauce credentials from https://app.saucelabs.com/user-settings.
  ```sh
  export SAUCE_USERNAME=__YOUR_SAUCE_USER_NAME__
  export SAUCE_ACCESS_KEY=__YOUR_SAUCE_ACCESS_KEY__
  ```

- Run the test the way you are used to.
