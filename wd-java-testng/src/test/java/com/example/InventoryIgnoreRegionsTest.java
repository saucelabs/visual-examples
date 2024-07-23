package com.example;

import com.example.pageobjects.InventoryPage;
import com.example.pageobjects.LoginPage;
import com.saucelabs.visual.CheckOptions;
import com.saucelabs.visual.VisualApi;
import com.saucelabs.visual.model.DiffingFlag;
import com.saucelabs.visual.model.IgnoreRegion;
import com.saucelabs.visual.testng.TestMetaInfoListener;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;

import java.net.MalformedURLException;
import java.util.Collections;
import java.util.EnumSet;

import static com.example.TestUtils.dotenv;

@Listeners({TestMetaInfoListener.class})
public class InventoryIgnoreRegionsTest {

    // Can be found at https://app.saucelabs.com/user-settings
    private static final String username = dotenv.get("SAUCE_USERNAME");
    private static final String accessKey = dotenv.get("SAUCE_ACCESS_KEY");

    private static VisualApi visual;
    private static RemoteWebDriver driver;

    @BeforeSuite
    public static void init() throws MalformedURLException {
        driver = TestUtils.getDriver(username, accessKey);
        visual = new VisualApi.Builder(driver, username, accessKey)
                .withBuild("Sauce Demo Test")
                .withBranch("main")
                .withProject("TestNG + WebDriver examples for " + System.getenv("SAUCE_USERNAME"))
                .withCaptureDom(true)
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

        // This example captures a snapshots, and ignore every change in a 200x200px square,
        // which top-left point is located at 100,100px.
        visual.sauceVisualCheck(
                "Inventory Page",
                new CheckOptions.Builder()
                        .withIgnoreElements(Collections.singletonList(inventoryPage.getAddBackpackToCartButton()))
                        .build());

        // This example captures a snapshots, and ignore:
        //   - Visual-only changes on the whole snapshot
        //   - Content changes that applies to AddBackpackToCartButton
        //   - Any non-position changes that applies to MenuButton
        visual.sauceVisualCheck(
                "Inventory Page - with selective ignore regions",
                new CheckOptions.Builder()
                        // Disable visual-only changes on the whole snapshot
                        .disableOnly(EnumSet.of(DiffingFlag.Visual))
                        // Disable any content changes on AddBackpackToCardButton
                        .disableOnly(EnumSet.of(DiffingFlag.Content), inventoryPage.getAddBackpackToCartButton())
                        // Disable all but Position changes on MenuButton
                        .enableOnly(EnumSet.of(DiffingFlag.Position), inventoryPage.getMenuButton())
                        .build());
    }

    @AfterSuite
    public static void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
