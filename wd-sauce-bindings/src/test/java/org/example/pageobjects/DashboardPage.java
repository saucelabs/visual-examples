package org.example.pageobjects;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class DashboardPage extends BasePage {

    private By chart = By.cssSelector(".chartjs-render-monitor");;

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
    public List<By> getIgnoreLocators() {
        List<By> locators = super.getIgnoreLocators();
        locators.addAll(new ArrayList<>(Arrays.asList(chart)));
        return locators;
    }
}
