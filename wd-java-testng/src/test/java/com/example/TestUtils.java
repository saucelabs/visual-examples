package com.example;

import org.openqa.selenium.MutableCapabilities;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.net.MalformedURLException;
import java.net.URL;

public class TestUtils {

    static RemoteWebDriver getWebDriver(String username, String accessKey) throws MalformedURLException {
        var caps = new DesiredCapabilities();
        caps.setBrowserName("chrome");
        return new RemoteWebDriver(getDriverUrl(username,accessKey), caps);
    }

    static RemoteWebDriver getAndroidEmulatorDriver(String username, String accessKey) throws MalformedURLException {
        var caps = getAndroidEmulatorCapabilities();
        return new RemoteWebDriver(getDriverUrl(username, accessKey), caps);
    }

    static RemoteWebDriver getAndroidDriver(String username, String accessKey) throws MalformedURLException {
        var caps = getAndroidCapabilities();
        return new RemoteWebDriver(getDriverUrl(username, accessKey), caps);
    }

    static RemoteWebDriver getIosSimulatorDriver(String username, String accessKey) throws MalformedURLException {
        var caps = getIosSimulatorCapabilities();
        return new RemoteWebDriver(getDriverUrl(username, accessKey), caps);
    }

    static RemoteWebDriver getIosDriver(String username, String accessKey) throws MalformedURLException {
        var caps = getIosCapabilities();
        return new RemoteWebDriver(getDriverUrl(username, accessKey), caps);
    }

    private static URL getDriverUrl(String username, String accessKey) throws MalformedURLException {
        if (username == null || accessKey == null || username.trim().isEmpty() || accessKey.trim().isEmpty()) {
            String err = "Sauce Labs credentials not found. Please set SAUCE_USERNAME and SAUCE_ACCESS_KEY in your environment";
            throw new RuntimeException(err);
        }
        // Can be found at "Driver creation" on https://app.saucelabs.com/user-settings
        return new URL("https://" + username + ":" + accessKey + "@ondemand.us-west-1.saucelabs.com:443/wd/hub");
    }

    private static MutableCapabilities getAndroidEmulatorCapabilities() {
        var caps = new MutableCapabilities();
        caps.setCapability("appium:deviceName", "Google Pixel 8 GoogleAPI Emulator");
        caps.setCapability("appium:platformVersion", "14.0");
        caps.setCapability("appium:automationName", "UiAutomator2");
        caps.setCapability("browserName", "Chrome");
        caps.setCapability("platformName", "Android");
        return caps;
    }

    private static MutableCapabilities getAndroidCapabilities() {
        MutableCapabilities caps = new MutableCapabilities();
        caps.setCapability("appium:deviceName", "Google Pixel 8");
        caps.setCapability("appium:automationName", "UiAutomator2");
        caps.setCapability("browserName", "Chrome");
        caps.setCapability("platformName", "Android");
        MutableCapabilities sauceOptions = new MutableCapabilities();
        sauceOptions.setCapability("appiumVersion", "2.0.0");
        caps.setCapability("sauce:options", sauceOptions);
        return caps;
    }

    private static MutableCapabilities getIosSimulatorCapabilities() {
        MutableCapabilities caps = new MutableCapabilities();
        caps.setCapability("appium:deviceName", "iPhone Simulator");
        caps.setCapability("appium:platformVersion", "16.2");
        caps.setCapability("appium:automationName", "XCUITest");
        caps.setCapability("browserName", "Safari");
        caps.setCapability("platformName", "iOS");
        return caps;
    }

    private static MutableCapabilities getIosCapabilities() {
        MutableCapabilities caps = new MutableCapabilities();
        caps.setCapability("appium:deviceName", "iPhone 11");
        caps.setCapability("appium:automationName", "XCUITest");
        caps.setCapability("browserName", "Safari");
        caps.setCapability("platformName", "iOS");
        MutableCapabilities sauceOptions = new MutableCapabilities();
        sauceOptions.setCapability("appiumVersion", "2.0.0");
        caps.setCapability("sauce:options", sauceOptions);
        return caps;
    }

}
