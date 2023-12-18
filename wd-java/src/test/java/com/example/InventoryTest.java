package com.example;

import com.example.pageobjects.InventoryPage;
import com.example.pageobjects.LoginPage;
import com.saucelabs.visual.DataCenter;
import com.saucelabs.visual.VisualApi;
import com.saucelabs.visual.junit5.TestMetaInfoExtension;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.net.MalformedURLException;

import static com.example.TestUtils.dotenv;


@ExtendWith({TestMetaInfoExtension.class})
public class InventoryTest {

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
                .withProject("JUnit + WebDriver examples for " + System.getenv("SAUCE_USERNAME"))
                .build();
    }

    @Test
    void checkInventoryPageLooksTheSame() {
        LoginPage loginPage = new LoginPage(driver);
        loginPage.open();

        visual.sauceVisualCheck("Before Login");

        loginPage.login("standard_user", "secret_sauce");

        InventoryPage inventoryPage = new InventoryPage(driver);
        inventoryPage.open();
        // this is here to generate a diff to better demonstrate sauce visual
        if(System.getProperty("modified") != null) {
            inventoryPage.addBackpackToCart();
        }

        visual.sauceVisualCheck("Inventory Page");
    }

    @AfterAll
    public static void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
