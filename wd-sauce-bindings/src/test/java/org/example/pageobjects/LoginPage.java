package org.example.pageobjects;

import lombok.Getter;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class LoginPage extends BasePage {

    public LoginPage(WebDriver driver) { super(driver); }

    @Override
    protected String getUrlPath() { return "auth/login"; }

    @Getter
    private final By usernameInput = By.cssSelector("input[data-test=\"email\"]");

    @Getter
    private final By passwordInput = By.cssSelector("input[data-test=\"password\"]");

    @Getter
    private final By submitBtn = By.cssSelector("input[data-test=\"login-submit\"]");

    public void login(String username, String password) {
        driver.findElement(usernameInput).sendKeys(username);
        driver.findElement(passwordInput).sendKeys(password);
        driver.findElement(submitBtn).click();
    }
}
