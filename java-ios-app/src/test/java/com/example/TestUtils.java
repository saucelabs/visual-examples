package com.example;

import io.appium.java_client.ios.IOSDriver;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.Instant;
import org.openqa.selenium.Capabilities;
import org.openqa.selenium.MutableCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;

public class TestUtils {

  static RemoteWebDriver getDriver(String username, String accessKey) throws MalformedURLException {
    return new IOSDriver(getDriverUrl(username, accessKey), getCapabilities());
  }

  /**
   * For all capabilities please check <a
   * href="https://saucelabs.com/products/platform-configurator">Platform Configurator</a> For
   * available devices please check <a href="https://app.saucelabs.com/live/app-testing">Available
   * Devices</a>
   */
  private static Capabilities getCapabilities() {
    // You should always target a specific device and OS version.
    // Different devices will generate different baselines as their screen size and pixel density
    // are different.
    // See: https://docs.saucelabs.com/visual-testing/mobile-native-testing/#best-practices
    MutableCapabilities caps = new MutableCapabilities();
    caps.setCapability("appium:deviceName", "iPhone 14 Pro");
    caps.setCapability("appium:platformVersion", "17");
    caps.setCapability("platformName", "iOS");
    caps.setCapability("appium:automationName", "XCUITest");
    caps.setCapability("appium:app", "storage:" + System.getenv("APP_FILEID"));
    MutableCapabilities sauceOptions = new MutableCapabilities();
    sauceOptions.setCapability("appiumVersion", "latest");
    sauceOptions.setCapability("name", "java-ios-app - Real Device");
    sauceOptions.setCapability("build", "Sauce Demo Test " + Instant.now());
    caps.setCapability("sauce:options", sauceOptions);
    return caps;
  }

  private static URL getDriverUrl(String username, String accessKey) throws MalformedURLException {
    if (username == null
        || accessKey == null
        || username.trim().isEmpty()
        || accessKey.trim().isEmpty()) {
      String err =
          "Sauce Labs credentials not found. Please set SAUCE_USERNAME and SAUCE_ACCESS_KEY in your environment";
      throw new RuntimeException(err);
    }
    String dataCenter = System.getenv("SAUCE_REGION");
    if (dataCenter == null || dataCenter.trim().isEmpty()) {
      dataCenter = "us-west-1";
    }
    return new URL(
        String.format(
            "https://%s:%s@ondemand.%s.saucelabs.com:443/wd/hub", username, accessKey, dataCenter));
  }
}
