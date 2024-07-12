package com.example;

import com.example.pageobjects.InventoryPage;
import com.example.pageobjects.LoginPage;
import com.saucelabs.visual.CheckOptions;
import com.saucelabs.visual.VisualApi;
import com.saucelabs.visual.junit5.TestMetaInfoExtension;
import com.saucelabs.visual.model.IgnoreRegion;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.net.MalformedURLException;
import java.util.Collections;

import static com.example.TestUtils.dotenv;

@ExtendWith({TestMetaInfoExtension.class})
public class InventoryIgnoreRegionsTest {

    // Can be found at "Driver creation" on https://app.saucelabs.com/user-settings
    private static final String username = dotenv.get("SAUCE_USERNAME");
    private static final String accessKey = dotenv.get("SAUCE_ACCESS_KEY");

    private static VisualApi visual;
    private static RemoteWebDriver driver;

    @BeforeAll
    public static void init() throws MalformedURLException {
        driver = TestUtils.getDriver(username, accessKey);
        visual = new VisualApi.Builder(driver, username, accessKey)
                .withBuild("Sauce Demo Test")
                .withBranch("main")
                .withProject("JUnit + WebDriver examples for " + System.getenv("SAUCE_USERNAME"))
                .withCaptureDom(true)
                .build();
    }

    @Test
    void checkInventoryPageWithIgnoreRegions() {
        LoginPage loginPage = new LoginPage(driver);
        loginPage.open();

        CheckOptions options = new CheckOptions();
        IgnoreRegion ignoreRegion = new IgnoreRegion(100,100,200,200);
        options.setIgnoreRegions(Collections.singletonList(ignoreRegion));
        visual.sauceVisualCheck("Before Login", options);

        loginPage.login("standard_user", "secret_sauce");

        InventoryPage inventoryPage = new InventoryPage(driver);
        inventoryPage.open();

        CheckOptions options2 = new CheckOptions();
        options2.setIgnoreElements(Collections.singletonList(inventoryPage.getAddBackpackToCartButton()));
        visual.sauceVisualCheck("Inventory Page", options2);
    }

    @AfterAll
    public static void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
