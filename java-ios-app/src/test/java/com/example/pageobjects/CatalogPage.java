package com.example.pageobjects;

import io.appium.java_client.AppiumBy;
import java.util.List;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.RemoteWebDriver;

public class CatalogPage {

  private final RemoteWebDriver driver;

  public CatalogPage(RemoteWebDriver driver) {
    this.driver = driver;
  }

  public List<WebElement> getProductImages() {
    return driver.findElements(AppiumBy.accessibilityId("Product Image"));
  }

  public List<WebElement> getVisibleProductPrices() {
    return driver.findElements(AppiumBy.accessibilityId("Product Price")).subList(0, 4);
  }

  public WebElement getCatalogContent() {
    return driver.findElement(
        AppiumBy.xpath("//XCUIElementTypeOther[@name=\"Catalog-screen\"]/XCUIElementTypeOther[2]"));
  }

  public WebElement getFullPageCatalog() {
    return driver.findElement(AppiumBy.xpath("//XCUIElementTypeCollectionView"));
  }
}
