package com.example;

import io.github.cdimascio.dotenv.Dotenv;
import org.openqa.selenium.MutableCapabilities;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.net.MalformedURLException;
import java.net.URL;

public class TestUtils {

    static final Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();

    static RemoteWebDriver getDriver(String username, String accessKey) throws MalformedURLException {
        var platform = dotenv.get("PLATFORM_NAME", "");
        MutableCapabilities caps;
        switch (platform) {
            case "ANDROID": {
                caps = getAndroidCapabilities();
                break;
            }
            case "ANDROID_EMULATOR": {
                caps = getAndroidEmulatorCapabilities();
                break;
            }
            case "IOS": {
                caps = getIosCapabilities();
                break;
            }
            case "IOS_SIMULATOR": {
                caps = getIosSimulatorCapabilities();
                break;
            }
            default: {
                caps = getChromeDesktopCapabilities();
                break;
            }
        }
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

    private static MutableCapabilities getChromeDesktopCapabilities() {
        var caps = new DesiredCapabilities();
        caps.setBrowserName("chrome");
        return caps;
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
        var caps = new MutableCapabilities();
        caps.setCapability("appium:deviceName", "Google Pixel 8");
        caps.setCapability("appium:automationName", "UiAutomator2");
        caps.setCapability("browserName", "Chrome");
        caps.setCapability("platformName", "Android");
        var sauceOptions = new MutableCapabilities();
        sauceOptions.setCapability("appiumVersion", "2.0.0");
        caps.setCapability("sauce:options", sauceOptions);
        return caps;
    }

    private static MutableCapabilities getIosSimulatorCapabilities() {
        var caps = new MutableCapabilities();
        caps.setCapability("appium:deviceName", "iPhone Simulator");
        caps.setCapability("appium:platformVersion", "16.2");
        caps.setCapability("appium:automationName", "XCUITest");
        caps.setCapability("browserName", "Safari");
        caps.setCapability("platformName", "iOS");
        return caps;
    }

    private static MutableCapabilities getIosCapabilities() {
        var caps = new MutableCapabilities();
        caps.setCapability("appium:deviceName", "iPhone 11");
        caps.setCapability("appium:automationName", "XCUITest");
        caps.setCapability("browserName", "Safari");
        caps.setCapability("platformName", "iOS");
        var sauceOptions = new MutableCapabilities();
        sauceOptions.setCapability("appiumVersion", "2.0.0");
        caps.setCapability("sauce:options", sauceOptions);
        return caps;
    }

}
