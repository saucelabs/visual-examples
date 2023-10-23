package com.example;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.ios.IOSDriver;
import org.openqa.selenium.MutableCapabilities;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.net.MalformedURLException;
import java.net.URL;

public class TestUtils {
    
    static RemoteWebDriver getWebDriver(String username, String accessKey) throws MalformedURLException {
        // Set capabilities for WebDriver
        var caps = new DesiredCapabilities();
        caps.setBrowserName("chrome");
        return new RemoteWebDriver(getDriverUrl(username,accessKey), caps);
    }

    static AndroidDriver getAndroidEmulatorDriver(String username, String accessKey) throws MalformedURLException {
        var caps = getAndroidEmulatorCapabilities();
        return new AndroidDriver(getDriverUrl(username, accessKey), caps);
    }

    static AndroidDriver getAndroidDriver(String username, String accessKey) throws MalformedURLException {
        var caps = getAndroidCapabilities();
        return new AndroidDriver(getDriverUrl(username, accessKey), caps);
    }

    private static URL getDriverUrl(String username, String accessKey) throws MalformedURLException {
        if (username == null || accessKey == null || username.trim().isEmpty() || accessKey.trim().isEmpty()) {
            String err = "Sauce Labs credentials not found. Please set SAUCE_USERNAME and SAUCE_ACCESS_KEY in your environment";
            throw new RuntimeException(err);
        }
        // Can be found at "Driver creation" on https://app.saucelabs.com/user-settings
        return new URL("https://" + username + ":" + accessKey + "@ondemand.saucelabs.com:443/wd/hub");
    }

    private static MutableCapabilities getAndroidEmulatorCapabilities() {
        var caps = new MutableCapabilities();
        caps.setCapability("platformName", "Android");
        caps.setCapability("browserName", "Chrome");
        caps.setCapability("appium:deviceName", "Android GoogleAPI Emulator");
        caps.setCapability("appium:platformVersion", "14.0");
        caps.setCapability("appium:automationName", "UiAutomator2");
        return caps;
    }

    private static MutableCapabilities getAndroidCapabilities() {
        var caps = new MutableCapabilities();
        caps.setCapability("platformName", "Android");
        caps.setCapability("browserName", "Chrome");
        caps.setCapability("appium:deviceName", "Google Pixel 8");
        caps.setCapability("appium:automationName", "UiAutomator2");
        var sauceOptions = new MutableCapabilities();
        sauceOptions.setCapability("appiumVersion", "2.0.0");
        caps.setCapability("sauce:options", sauceOptions);
        return caps;
    }
}
