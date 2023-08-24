package com.example;

import com.example.pageobjects.HomePage;
import com.saucelabs.visual.Options;
import com.saucelabs.visual.Region;
import com.saucelabs.visual.VisualApi;
import com.saucelabs.visual.model.IgnoreRegion;
import io.github.cdimascio.dotenv.Dotenv;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.Test;

import java.net.MalformedURLException;
import java.util.List;

public class WootIgnoreRegionsTest {

    private static final Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
    private static final String username = dotenv.get("SAUCE_USERNAME");
    private static final String accessKey = dotenv.get("SAUCE_ACCESS_KEY");

    private static VisualApi visual;
    private static RemoteWebDriver driver;

    @BeforeSuite
    public static void init() throws MalformedURLException {
        driver = TestUtils.getWebDriver(username, accessKey);
        visual = new VisualApi(driver, Region.US_WEST_1, username, accessKey);
    }

    @Test
    void checkInventoryPageWithIgnoreRegions() {
        HomePage homePage = new HomePage(driver);
        homePage.open();
        visual.check("Top of Page");

        Options options = new Options();
        WebElement element = homePage.getFirstAd();
        IgnoreRegion ignoreRegion = new IgnoreRegion("name", element.getSize().getHeight(), element.getSize().getWidth(), element.getLocation().getX(), element.getLocation().getY());
        options.setIgnoreRegions(List.of(ignoreRegion));
        homePage.scrollToSecondRow();
        visual.check("Second Row", options);

        homePage.scrollToBestSellers();
        visual.check("Best Sellers");

    }

    @AfterSuite
    public static void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    public class IgnoreRegionByElement extends IgnoreRegion {
        IgnoreRegionByElement(WebElement element) {
            super(element.getLocation().getX(), element.getLocation().getY(), element.getSize().getWidth(), element.getSize().getHeight());
        }

        IgnoreRegionByElement(String name, WebElement element) {
            super("", element.getLocation().getX(), element.getLocation().getY(), element.getSize().getWidth(), element.getSize().getHeight());
        }
    }
}

