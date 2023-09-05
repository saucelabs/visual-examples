package org.example.pageobjects;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

public class ContactPage extends BasePage {

    private final By submitBtn = By.cssSelector("input[data-test=\"contact-submit\"]");

    @Override
    protected String getUrlPath() { return "contact"; }

    @Override
    protected void sync() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10)); // 10 is the timeout in seconds
        wait.until(ExpectedConditions.presenceOfElementLocated(submitBtn));
    }

    @Override
    public List<WebElement> getIgnoreRegions() {
        return null;
    }

    public ContactPage(WebDriver driver) {
        super(driver);
    }

}
