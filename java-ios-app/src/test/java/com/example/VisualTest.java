package com.example;

import com.example.pageobjects.CatalogPage;
import com.example.pageobjects.LoginPage;
import com.example.pageobjects.MenuPage;
import com.saucelabs.visual.CheckOptions;
import com.saucelabs.visual.VisualApi;
import com.saucelabs.visual.junit5.TestMetaInfoExtension;
import com.saucelabs.visual.model.FullPageScreenshotConfig;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.EnabledIfEnvironmentVariable;
import org.junit.jupiter.api.extension.ExtendWith;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.RemoteWebDriver;

@ExtendWith({TestMetaInfoExtension.class})
public class VisualTest {

  private static final String SAUCE_USERNAME = System.getenv("SAUCE_USERNAME");
  private static final String SAUCE_ACCESS_KEY = System.getenv("SAUCE_ACCESS_KEY");
  private static final String VISUAL_CHECK = System.getenv("VISUAL_CHECK");

  private static VisualApi visual;
  private static RemoteWebDriver driver;

  @BeforeAll
  public static void init() throws MalformedURLException {
    driver = TestUtils.getDriver(SAUCE_USERNAME, SAUCE_ACCESS_KEY);
    visual =
        new VisualApi.Builder(driver, SAUCE_USERNAME, SAUCE_ACCESS_KEY)
            .withBuild("Sauce Demo Test")
            .withBranch("main")
            .withProject("Java iOS Native App")
            .build();
  }

  @Test
  void checkAppCatalog() {
    visual.sauceVisualCheck("Startup");

    MenuPage menuPage = new MenuPage(driver);
    menuPage.open();
    menuPage.clickLoginButton();

    LoginPage loginPage = new LoginPage(driver);
    if (VISUAL_CHECK != null && !VISUAL_CHECK.isEmpty()) {
      loginPage.clickVisualUserButton();
    } else {
      loginPage.clickBobUserButton();
    }
    loginPage.clickLoginButton();

    CatalogPage catalogPage = new CatalogPage(driver);

    WebElement firstImage = catalogPage.getProductImages().get(0);
    List<WebElement> prices = catalogPage.getVisibleProductPrices();
    List<WebElement> ignore = new ArrayList<>();
    ignore.add(firstImage);
    ignore.addAll(prices);

    visual.sauceVisualCheck(
        "App Catalog", new CheckOptions.Builder().withIgnoreElements(ignore).build());
  }

  @Test
  void captureOnlyCatalogContent() {
    CatalogPage catalogPage = new CatalogPage(driver);
    visual.sauceVisualCheck(
        "Catalog Fragment",
        new CheckOptions.Builder().withClipElement(catalogPage.getCatalogContent()).build());
  }

  @Test
  @EnabledIfEnvironmentVariable(named = "FPS", matches = "enabled")
  void checkFullPageCatalog() {
    CatalogPage catalogPage = new CatalogPage(driver);
    visual.sauceVisualCheck(
        "Full page app catalog",
        new CheckOptions.Builder()
            .withFullPageConfig(
                new FullPageScreenshotConfig.Builder()
                    .withScrollElement(catalogPage.getFullPageCatalog())
                    .build())
            .build());
  }
}
