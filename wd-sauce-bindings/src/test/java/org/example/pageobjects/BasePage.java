package org.example.pageobjects;

import lombok.Getter;
import lombok.Setter;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public abstract class BasePage {
    protected final WebDriver driver;
    @Getter
    private final By logoLink = By.id("Layer_1");

    @Getter
    private final By homeLink = By.cssSelector("a[data-test=\"nav-home\"]");

    protected abstract String getUrlPath();

    protected abstract void sync();

    public List<By> getIgnoreLocators() {
        return new ArrayList<>(List.of(logoLink));
    }

    public List<WebElement> getAllIgnoreElements() {
        List<WebElement> elements = new ArrayList<>();

        for (By locator: getIgnoreLocators()) {
            elements.add(driver.findElement(locator));
        }
        return elements;
    }

    public BasePage(WebDriver driver) {
        this.driver = driver;
    }

    @Setter
    private boolean withBugs = false;

    public void open() {
        driver.get(getFullUrl(withBugs));
    }

    protected String getFullUrl(boolean debug) {
        String debugStr = debug ? "with-bugs." : "";
        return "https://" + debugStr + "practicesoftwaretesting.com/#/" + getUrlPath();
    }

    public HomePage navigateToHome() {
        WebElement home = driver.findElement(homeLink);
        home.click();
        HomePage homePage = new HomePage(driver);
        homePage.sync();
        return homePage;
    }
}
