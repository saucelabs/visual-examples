package com.example.pageobjects;

import io.appium.java_client.AppiumBy;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.RemoteWebDriver;

public class LoginPage {

    private final RemoteWebDriver driver;

    public LoginPage(RemoteWebDriver driver) {
        this.driver = driver;
    }

    public WebElement getBobUserButton() {
        return driver.findElement(AppiumBy.accessibilityId("bob@example.com"));
    }

    public WebElement getVisualUserButton() {
        return driver.findElement(AppiumBy.accessibilityId("visual@example.com"));
    }

    public WebElement getLoginButton() {
        return driver.findElement(AppiumBy.accessibilityId("Login"));
    }

    public void clickBobUserButton() {
        getBobUserButton().click();
    }

    public void clickVisualUserButton() {
        getVisualUserButton().click();
    }

    public void clickLoginButton() {
        getLoginButton().click();
    }

}
