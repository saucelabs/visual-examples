package org.example;

import com.saucelabs.visual.Options;
import org.junit.jupiter.api.Test;

public class IgnoreRegionTest extends SauceVisualBaseTest {
    @Test
    void checkHomePage() {
        Options options = new Options();
        options.setIgnoreElements(driver.findElements(homePage.getLogoLink()));
        visual().check("IgnoreRegionTest - Home Page", options);
    }
}
