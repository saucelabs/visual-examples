package org.example.pageobjects;

import lombok.Getter;
import lombok.Setter;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public abstract class BasePage {
    protected final WebDriver driver;

    @Getter
    private final By homeLink = By.cssSelector("a[data-test=\"nav-home\"]");

    protected abstract String getUrlPath();

    public BasePage(WebDriver driver) {
        this.driver = driver;
    }

    @Setter
    private boolean with_bugs = false;

    public void open() {
        driver.get(getFullUrl(with_bugs));
    }

    protected String getFullUrl(boolean debug) {
        String debugStr = debug ? "with-bugs." : "";
        return "https://" + debugStr + "practicesoftwaretesting.com/#/" + getUrlPath();
    }

    public HomePage navigateToHome() {
        WebElement home = driver.findElement(homeLink);
        home.click();
        return new HomePage(driver);
    }
}
