package com.example;

import com.example.pageobjects.InventoryPage;
import com.example.pageobjects.LoginPage;
import com.saucelabs.visual.DataCenter;
import com.saucelabs.visual.CheckOptions;
import com.saucelabs.visual.VisualApi;
import com.saucelabs.visual.model.IgnoreRegion;
import com.saucelabs.visual.testng.TestMetaInfoListener;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;

import java.net.MalformedURLException;
import java.util.Collections;
import java.util.List;

import static com.example.TestUtils.dotenv;

@Listeners({TestMetaInfoListener.class})
public class InventoryIgnoreRegionsTest {

    private static final String username = dotenv.get("SAUCE_USERNAME");
    private static final String accessKey = dotenv.get("SAUCE_ACCESS_KEY");

    private static VisualApi visual;
    private static RemoteWebDriver driver;

    @BeforeSuite
    public static void init() throws MalformedURLException {
        driver = TestUtils.getDriver(username, accessKey);
        visual = new VisualApi.Builder(driver, username, accessKey, DataCenter.US_WEST_1)
                .withBuild("Sauce Demo Test")
                .withBranch("main")
                .withProject("TestNG + WebDriver examples for " + System.getenv("SAUCE_USERNAME"))
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

    @AfterSuite
    public static void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
