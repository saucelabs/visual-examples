package com.example;

import static com.example.TestUtils.dotenv;

import com.example.pageobjects.LoginPage;
import com.saucelabs.visual.CheckOptions;
import com.saucelabs.visual.DataCenter;
import com.saucelabs.visual.VisualApi;
import com.saucelabs.visual.junit5.TestMetaInfoExtension;
import java.net.MalformedURLException;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.openqa.selenium.remote.RemoteWebDriver;

@ExtendWith({TestMetaInfoExtension.class})
public class InventoryTest {

  private static final String username = dotenv.get("SAUCE_USERNAME");
  private static final String accessKey = dotenv.get("SAUCE_ACCESS_KEY");

  private static VisualApi visual;
  private static RemoteWebDriver driver;

  @BeforeAll
  public static void init() throws MalformedURLException {
    driver = TestUtils.getDriver(username, accessKey);
    visual =
            new VisualApi.Builder(driver, username, accessKey)
                    .withBuild("Optum Repro Test")
                    .withBranch("main")
                    .withProject("JUnit + WebDriver examples for " + System.getenv("SAUCE_USERNAME"))
                    .withCaptureDom(true)
                    .build();
  }

  @Test
  void initialTest() {
    LoginPage loginPage = new LoginPage(driver);
    loginPage.open();
    CheckOptions options = new CheckOptions();
    options.setClipSelector(".o5-simple-card-grouping__brand-white");
    options.setDiffingMethod(CheckOptions.DiffingMethod.BALANCED);
    visual.sauceVisualCheck("Before Login", options);
  }

  @AfterAll
  public static void tearDown() {
    if (driver != null) {
      driver.quit();
    }
  }
}
