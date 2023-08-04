package com.example;

import com.example.pageobjects.InventoryPage;
import com.example.pageobjects.LoginPage;
import com.saucelabs.visual.Options;
import com.saucelabs.visual.Region;
import com.saucelabs.visual.VisualApi;
import com.saucelabs.visual.model.IgnoreRegion;
import io.github.cdimascio.dotenv.Dotenv;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.net.MalformedURLException;
import java.util.List;

public class InventoryIgnoreRegionsTest {

    private static final Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
    private static final String username = dotenv.get("SAUCE_USERNAME");
    private static final String accessKey = dotenv.get("SAUCE_ACCESS_KEY");

    private static VisualApi visual;
    private static RemoteWebDriver driver;

    @BeforeAll
    public static void init() throws MalformedURLException {
        driver = TestUtils.getWebDriver(username, accessKey);
        visual = new VisualApi(driver, Region.US_WEST_1, username, accessKey);
    }

    @Test
    void checkInventoryPageWithIgnoreRegions() {
        LoginPage loginPage = new LoginPage(driver);
        loginPage.open();

        Options options = new Options();
        IgnoreRegion ignoreRegion = new IgnoreRegion(200,200,100,100);
        options.setIgnoreRegions(List.of(ignoreRegion));
        visual.check("Before Login", options);

        loginPage.login("standard_user", "secret_sauce");

        InventoryPage inventoryPage = new InventoryPage(driver);
        inventoryPage.open();

        Options options2 = new Options();
        options2.setIgnoreElements(List.of(inventoryPage.getAddBackpackToCartButton()));
        visual.check("Inventory Page", options2);
    }

    @AfterAll
    public static void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
