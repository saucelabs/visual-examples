package org.example.pageobjects;

import lombok.Getter;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

public class LoginPage extends BasePage {

    @Getter
    private final By usernameInput = By.cssSelector("input[data-test=\"email\"]");

    @Getter
    private final By passwordInput = By.cssSelector("input[data-test=\"password\"]");

    @Getter
    private final By submitBtn = By.cssSelector("input[data-test=\"login-submit\"]");

    public LoginPage(WebDriver driver) { super(driver); }

    @Override
    protected String getUrlPath() { return "auth/login"; }

    @Override
    protected void sync() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(submitBtn));
    }

    public DashboardPage loginAdmin() {
        driver.findElement(usernameInput).sendKeys("admin@practicesoftwaretesting.com");
        driver.findElement(passwordInput).sendKeys("welcome01");
        driver.findElement(submitBtn).click();
        DashboardPage dashboardPage = new DashboardPage(driver);
        dashboardPage.sync();
        return dashboardPage;
    }

    public AccountPage loginCustomer() {
        driver.findElement(usernameInput).sendKeys("customer@practicesoftwaretesting.com");
        driver.findElement(passwordInput).sendKeys("welcome01");
        driver.findElement(submitBtn).click();
        AccountPage accountPage = new AccountPage(driver);
        accountPage.sync();
        return accountPage;
    }

    public AccountPage login(String username, String password) {
        driver.findElement(usernameInput).sendKeys(username);
        driver.findElement(passwordInput).sendKeys(password);
        driver.findElement(submitBtn).click();
        AccountPage accountPage = new AccountPage(driver);
        accountPage.sync();
        return accountPage;
    }}
