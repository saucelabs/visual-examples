package org.example.pageobjects;

import lombok.Getter;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class HomePage extends BasePage {
    @Override
    protected String getUrlPath() { return ""; }

    @Getter
    private final By contactLink = By.cssSelector("a[data-test=\"nav-contact\"]");
    @Getter
    private final By signInLink = By.cssSelector("a[data-test=\"nav-sign-in\"]");
    @Getter
    private final By logoLink = By.id("Layer_1");
    public HomePage(WebDriver driver) { super(driver); }

    public LoginPage navigateToLogin() {
        WebElement signIn = driver.findElement(signInLink);
        signIn.click();
        return new LoginPage(driver);
    }

    public ContactPage navigateToContactPage() {
        WebElement contact = driver.findElement(contactLink);
        contact.click();
        return new ContactPage(driver);
    }
}
