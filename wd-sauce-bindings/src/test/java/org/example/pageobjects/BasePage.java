package org.example.pageobjects;

import lombok.Getter;
import lombok.Setter;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import java.util.List;

public abstract class BasePage {
    protected final WebDriver driver;

    @Getter
    private final By homeLink = By.cssSelector("a[data-test=\"nav-home\"]");

    protected abstract String getUrlPath();

    protected abstract void sync();

    public abstract List<WebElement> getIgnoreRegions();

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
