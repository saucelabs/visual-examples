package com.example;

import com.example.pageobjects.InventoryPage;
import com.example.pageobjects.LoginPage;
import com.saucelabs.visual.Options;
import com.saucelabs.visual.Region;
import com.saucelabs.visual.VisualApi;
import com.saucelabs.visual.model.IgnoreRegion;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.Test;

import java.net.MalformedURLException;
import java.util.List;

import static com.example.TestUtils.dotenv;

public class InventoryIgnoreRegionsTest {

    private static final String username = dotenv.get("SAUCE_USERNAME");
    private static final String accessKey = dotenv.get("SAUCE_ACCESS_KEY");

    private static VisualApi visual;
    private static RemoteWebDriver driver;

    @BeforeSuite
    public static void init() throws MalformedURLException {
        driver = TestUtils.getDriver(username, accessKey);
        visual = new VisualApi(driver, Region.US_WEST_1, username, accessKey);
    }

    @Test
    void checkInventoryPageWithIgnoreRegions() {
        var loginPage = new LoginPage(driver);
        loginPage.open();

        var options = new Options();
        var ignoreRegion = new IgnoreRegion(200,200,100,100);
        options.setIgnoreRegions(List.of(ignoreRegion));
        visual.check("Before Login", options);

        loginPage.login("standard_user", "secret_sauce");

        var inventoryPage = new InventoryPage(driver);
        inventoryPage.open();

        var options2 = new Options();
        options2.setIgnoreElements(List.of(inventoryPage.getAddBackpackToCartButton()));
        visual.check("Inventory Page", options2);
    }

    @AfterSuite
    public static void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
