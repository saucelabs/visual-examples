package org.example.pageobjects;

import lombok.val;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

public class DashboardPage extends BasePage {
    public DashboardPage(WebDriver driver) {
        super(driver);
    }

    @Override
    protected String getUrlPath() {
        return "admin/dashboard";
    }

    @Override
    protected void sync() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector(".chartjs-render-monitor")));
    }

    @Override
    public List<WebElement> getIgnoreRegions() {
        return driver.findElements(By.cssSelector(".chartjs-render-monitor"));
    }
}
