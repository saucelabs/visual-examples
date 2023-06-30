package org.example;

import com.saucelabs.visual.VisualApi;
import org.example.pageobjects.InventoryPage;
import org.example.pageobjects.LoginPage;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.net.MalformedURLException;
import java.net.URL;

public class InventoryTest {

    private static final String USERNAME = System.getenv("SAUCE_USERNAME");
    private static final String ACCESS_KEY = System.getenv("SAUCE_ACCESS_KEY");
    public static final String WD_URL = "https://" + USERNAME + ":" + ACCESS_KEY +
            "@ondemand.us-west-1.saucelabs.com:443/wd/hub";

    private static VisualApi visual;
    private static RemoteWebDriver driver;

    @BeforeAll
    public static void init() throws MalformedURLException {
        DesiredCapabilities caps = new DesiredCapabilities();
        caps.setBrowserName("chrome");
        driver = new RemoteWebDriver(new URL(WD_URL), caps);
        visual = VisualApi.forProductionUsWest(driver);
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
