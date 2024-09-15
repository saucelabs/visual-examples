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
        String platform = dotenv.get("PLATFORM_NAME", "");
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
        String dataCenter = dotenv.get("SAUCE_REGION", "us-west-1");
        return new URL("https://" + username + ":" + accessKey + "@ondemand." + dataCenter + ".saucelabs.com:443/wd/hub");
    }

    private static MutableCapabilities getChromeDesktopCapabilities() {
        DesiredCapabilities caps = new DesiredCapabilities();
        caps.setBrowserName("chrome");
        return caps;
    }

    private static MutableCapabilities getAndroidEmulatorCapabilities() {
        MutableCapabilities caps = new MutableCapabilities();
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
        sauceOptions.setCapability("appiumVersion", "latest");
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
        sauceOptions.setCapability("appiumVersion", "latest");
        caps.setCapability("sauce:options", sauceOptions);
        return caps;
    }

}
