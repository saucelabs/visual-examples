package com.example;

import com.example.pageobjects.InventoryPage;
import com.example.pageobjects.LoginPage;
import com.saucelabs.visual.DataCenter;
import com.saucelabs.visual.VisualApi;
import com.saucelabs.visual.testng.TestMetaInfoListener;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;

import java.net.MalformedURLException;

import static com.example.TestUtils.dotenv;

@Listeners({TestMetaInfoListener.class})
public class InventoryModifiedTest {

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
                .withProject("TestNG + WebDriver examples")
                .build();
    }

    @Test
    void checkInventoryPageLooksTheSame() {
        var loginPage = new LoginPage(driver);
        loginPage.open();

        visual.sauceVisualCheck("Before Login");

        loginPage.login("standard_user", "secret_sauce");

        var inventoryPage = new InventoryPage(driver);
        inventoryPage.open();
        inventoryPage.addBackpackToCart();

        visual.sauceVisualCheck("Inventory Page");
    }

    @AfterSuite
    public static void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}