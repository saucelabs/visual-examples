package com.example;

import com.example.pageobjects.InventoryLongPage;
import com.example.pageobjects.LoginPage;
import com.saucelabs.visual.CheckOptions;
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
public class InventoryFullPageTest {

    // Can be found at https://app.saucelabs.com/user-settings
    private static final String username = dotenv.get("SAUCE_USERNAME");
    private static final String accessKey = dotenv.get("SAUCE_ACCESS_KEY");

    private static VisualApi visual;
    private static RemoteWebDriver driver;

    @BeforeAll
    public static void init() throws MalformedURLException {
        driver = TestUtils.getDriver(username, accessKey);
        visual = new VisualApi.Builder(driver, username, accessKey)
                .withBuild("Sauce Demo Test")
                .withBranch("main")
                .withProject("JUnit + WebDriver examples for " + System.getenv("SAUCE_USERNAME"))
                .withCaptureDom(true)
                .build();
    }

    @Test
    void checkInventoryPageLooksTheSame() {
        LoginPage loginPage = new LoginPage(driver);
        loginPage.open();

        visual.sauceVisualCheck("Before Login");
        String user = "standard_user";
        if (System.getProperty("modified") != null) {
            user = "visual_user";
        }
        loginPage.login(user, "secret_sauce");

        InventoryLongPage inventoryPage = new InventoryLongPage(driver);
        inventoryPage.open();
        CheckOptions options = new CheckOptions();
        options.enableFullPageScreenshots();
        visual.sauceVisualCheck("Inventory Page (full page)", options);
    }

    @AfterAll
    public static void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
