package com.example.pageobjects;

import io.appium.java_client.AppiumBy;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.RemoteWebDriver;

public class MenuPage {

  private final RemoteWebDriver driver;

  public MenuPage(RemoteWebDriver driver) {
    this.driver = driver;
  }

  public WebElement getLoginButton() {
    return driver.findElement(AppiumBy.accessibilityId("LogOut-menu-item"));
  }

  public WebElement getMenuButton() {
    return driver.findElement(AppiumBy.accessibilityId("More-tab-item"));
  }

  public void open() {
    getMenuButton().click();
  }

  public void clickLoginButton() {
    getLoginButton().click();
  }
}
