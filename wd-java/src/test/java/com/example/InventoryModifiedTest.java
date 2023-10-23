package com.example;

import com.example.pageobjects.LoginPage;
import com.saucelabs.visual.Region;
import com.saucelabs.visual.VisualApi;
import io.github.cdimascio.dotenv.Dotenv;
import com.example.pageobjects.InventoryPage;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.net.MalformedURLException;

public class InventoryModifiedTest {

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
    void checkInventoryPageLooksTheSame() {
        var loginPage = new LoginPage(driver);
        loginPage.open();

        visual.check("Before Login");

        loginPage.login("standard_user", "secret_sauce");

        var inventoryPage = new InventoryPage(driver);
        inventoryPage.open();
        inventoryPage.addBackpackToCart();

        visual.check("Inventory Page");
    }

    @AfterAll
    public static void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
