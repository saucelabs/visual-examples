package com.example.pageobjects;

import com.saucelabs.visual.model.IgnoreRegion;
import org.openqa.selenium.*;
import org.openqa.selenium.devtools.v85.network.model.SignedExchangeReceived;

public class HomePage {

    private final WebDriver driver;
    private static final By secondRow = By.cssSelector("li[data-test-ui=\"dailyDealsOffer5\"]");

    private static final By bestSellers = By.cssSelector("div[data-test-ui=\"bestSellersShoveler\"]");

    private By firstAd = By.cssSelector("div[data-test-ui=\"advertisementLeaderboard1\"]");

    public HomePage(WebDriver driver) {
        this.driver = driver;
    }

    public void open() {
        driver.get("https://www.woot.com/");
    }

    public WebElement getFirstAd() {
        return driver.findElement(firstAd);
    }

    public WebElement getBestSellers() {
        return driver.findElement(bestSellers);
    }

    public void scrollToBestSellers() {
        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", getBestSellers());
    }

    public WebElement getSecondRow() {
        return driver.findElement(secondRow);
    }

    public void scrollToSecondRow() {
        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", getSecondRow());
    }

}

