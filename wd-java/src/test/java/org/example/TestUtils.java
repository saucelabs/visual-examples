package org.example;

import io.github.cdimascio.dotenv.Dotenv;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.net.MalformedURLException;
import java.net.URL;

public class TestUtils {
    public static Dotenv dotenv = Dotenv.load();

    static RemoteWebDriver getWebDriver() throws MalformedURLException {
        DesiredCapabilities caps = new DesiredCapabilities();
        caps.setBrowserName("chrome");

        String username = dotenv.get("SAUCE_USERNAME");
        String accessKey = dotenv.get("SAUCE_ACCESS_KEY");
        if (username == null || accessKey == null || username.trim().isEmpty() || accessKey.trim().isEmpty()) {
            String err = "Sauce Labs credentials not found. Please set SAUCE_USERNAME and SAUCE_ACCESS_KEY in src/test/resources/.env file";
            throw new RuntimeException(err);
        }
        String webDriverUrl = "https://" + username + ":" + accessKey + "@ondemand.saucelabs.com:443/wd/hub";
        return new RemoteWebDriver(new URL(webDriverUrl), caps);
    }
}
