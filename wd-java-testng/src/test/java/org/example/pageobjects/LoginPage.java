package org.example.pageobjects;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class LoginPage {

    private final WebDriver driver;

    public LoginPage(WebDriver driver) {
        this.driver = driver;
    }

    public void open() {
        driver.get("https://www.saucedemo.com/");
    }

    public WebElement getInputUsername() {
        return driver.findElement(By.id("user-name"));
    }

    public WebElement getInputPassword() {
        return driver.findElement(By.id("password"));
    }

    public WebElement getBtnSubmit() {
        return driver.findElement(By.cssSelector("input[type=\"submit\"]"));
    }

    public void login(String username, String password) {
        getInputUsername().sendKeys(username);
        getInputPassword().sendKeys(password);
        getBtnSubmit().click();
    }
}
