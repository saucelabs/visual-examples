package com.example;

import com.example.pageobjects.InventoryPage;
import com.example.pageobjects.LoginPage;
import com.saucelabs.visual.DataCenter;
import com.saucelabs.visual.Options;
import com.saucelabs.visual.VisualApi;
import com.saucelabs.visual.model.IgnoreRegion;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.net.MalformedURLException;
import java.util.List;

import static com.example.TestUtils.dotenv;

public class InventoryIgnoreRegionsTest {

    private static final String username = dotenv.get("SAUCE_USERNAME");
    private static final String accessKey = dotenv.get("SAUCE_ACCESS_KEY");

    private static VisualApi visual;
    private static RemoteWebDriver driver;

    @BeforeAll
    public static void init() throws MalformedURLException {
        driver = TestUtils.getDriver(username, accessKey);
        visual = new VisualApi.Builder(driver, username, accessKey, DataCenter.US_WEST_1)
                .withBuild("Sauce Demo Test")
                .withBranch("main")
                .withProject("JUnit + WebDriver example")
                .build();
    }

    @Test
    void checkInventoryPageWithIgnoreRegions() {
        var loginPage = new LoginPage(driver);
        loginPage.open();

        var options = new Options();
        var ignoreRegion = new IgnoreRegion(100,100,200,200);
        options.setIgnoreRegions(List.of(ignoreRegion));
        visual.sauceVisualCheck("Before Login", options);

        loginPage.login("standard_user", "secret_sauce");

        var inventoryPage = new InventoryPage(driver);
        inventoryPage.open();

        var options2 = new Options();
        options2.setIgnoreElements(List.of(inventoryPage.getAddBackpackToCartButton()));
        visual.sauceVisualCheck("Inventory Page", options2);
    }

    @AfterAll
    public static void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
