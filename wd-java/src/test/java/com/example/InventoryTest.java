package com.example;

import static com.example.TestUtils.dotenv;

import com.example.pageobjects.InventoryPage;
import com.example.pageobjects.LoginPage;
import com.saucelabs.visual.CheckOptions;
import com.saucelabs.visual.CheckOptions.DiffingMethod;
import com.saucelabs.visual.VisualApi;
import com.saucelabs.visual.junit5.TestMetaInfoExtension;
import com.saucelabs.visual.model.DiffingFlag;
import java.net.MalformedURLException;
import java.util.EnumSet;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.openqa.selenium.remote.RemoteWebDriver;

@ExtendWith({TestMetaInfoExtension.class})
public class InventoryTest {

  // Can be found at https://app.saucelabs.com/user-settings
  private static final String username = dotenv.get("SAUCE_USERNAME");
  private static final String accessKey = dotenv.get("SAUCE_ACCESS_KEY");

  private static VisualApi visual;
  private static RemoteWebDriver driver;

  @BeforeAll
  public static void init() throws MalformedURLException {
    driver = TestUtils.getDriver(username, accessKey);
    visual =
        new VisualApi.Builder(driver, username, accessKey)
            .withBuild("Sauce Demo Test")
            .withBranch("main")
            .withProject("JUnit + WebDriver examples for " + System.getenv("SAUCE_USERNAME"))
            .withCaptureDom(true)
            .build();
  }

  @Test
  void checkInventoryPageLooksTheSame() {
    LoginPage loginPage = new LoginPage(driver);
    loginPage.open();

    loginPage.getInputUsername().sendKeys("standard_user");
    loginPage.getInputPassword().sendKeys("secret_sauce");

    EnumSet<DiffingFlag> contentChanges = EnumSet.of(DiffingFlag.Content);

    visual.sauceVisualCheck(
        "Before Login",
        new CheckOptions.Builder()
            .withDiffingMethod(DiffingMethod.BALANCED)
            .disableOnly(contentChanges, loginPage.getInputUsername())
            .disableOnly(contentChanges, loginPage.getInputPassword())
            .build());

    loginPage.getBtnSubmit().click();

    InventoryPage inventoryPage = new InventoryPage(driver);
    inventoryPage.open();
    // this is here to generate a diff to better demonstrate sauce visual
    if (System.getProperty("modified") != null) {
      inventoryPage.clickAddBackpackToCart();
    }

    visual.sauceVisualCheck("Inventory Page");
  }

  @AfterAll
  public static void tearDown() {
    if (driver != null) {
      driver.quit();
    }
  }
}
