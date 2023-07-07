package org.example;

import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.net.MalformedURLException;
import java.net.URL;

public class TestUtils {
    
    static RemoteWebDriver getWebDriver(String username, String accessKey) throws MalformedURLException {
        if (username == null || accessKey == null || username.trim().isEmpty() || accessKey.trim().isEmpty()) {
            String err = "Sauce Labs credentials not found. Please set SAUCE_USERNAME and SAUCE_ACCESS_KEY in your environment";
            throw new RuntimeException(err);
        }
        // Can be found at "Driver creation" on https://app.saucelabs.com/user-settings
        String webDriverUrl = "https://" + username + ":" + accessKey + "@ondemand.saucelabs.com:443/wd/hub";

        // Set capabilities for WebDriver
        DesiredCapabilities caps = new DesiredCapabilities();
        caps.setBrowserName("chrome");

        return new RemoteWebDriver(new URL(webDriverUrl), caps);
    }
}
