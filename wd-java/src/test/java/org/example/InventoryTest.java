package org.example;

import com.saucelabs.visual.Region;
import com.saucelabs.visual.VisualApi;
import org.example.pageobjects.InventoryPage;
import org.example.pageobjects.LoginPage;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.net.MalformedURLException;

import static org.example.TestUtils.dotenv;

public class InventoryTest {

    private static VisualApi visual;
    private static RemoteWebDriver driver;

    @BeforeAll
    public static void init() throws MalformedURLException {
        driver = TestUtils.getWebDriver();
        visual = new VisualApi(driver, Region.US_WEST_1, dotenv.get("SAUCE_USERNAME"), dotenv.get("SAUCE_ACCESS_KEY"));
    }

    @Test
    void checkInventoryPageLooksTheSame() {
        LoginPage loginPage = new LoginPage(driver);
        loginPage.open();

        visual.check("Before Login");

        loginPage.login("standard_user", "secret_sauce");

        InventoryPage inventoryPage = new InventoryPage(driver);
        inventoryPage.open();

        visual.check("Inventory Page");
    }

    @AfterAll
    public static void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
