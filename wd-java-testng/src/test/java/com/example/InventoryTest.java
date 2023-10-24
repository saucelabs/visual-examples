package com.example;

import com.example.pageobjects.InventoryPage;
import com.example.pageobjects.LoginPage;
import com.saucelabs.visual.Region;
import com.saucelabs.visual.VisualApi;
import io.github.cdimascio.dotenv.Dotenv;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.Test;

import java.net.MalformedURLException;

public class InventoryTest {

    private static final Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
    private static final String username = dotenv.get("SAUCE_USERNAME");
    private static final String accessKey = dotenv.get("SAUCE_ACCESS_KEY");

    private static VisualApi visual;
    private static RemoteWebDriver driver;

    @BeforeSuite
    public static void init() throws MalformedURLException {
        driver = TestUtils.getWebDriver(username, accessKey);
        // for Android: TestUtils.getAndroidDriver(username, accessKey);
        // for Android Emulator: TestUtils.getAndroidEmulatorDriver(username, accessKey);
        // for Ios: TestUtils.getIosDriver(username, accessKey);
        // for Ios Simulator: TestUtils.getIosSimulatorDriver(username, accessKey);
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

        visual.check("Inventory Page");
    }

    @AfterSuite
    public static void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}