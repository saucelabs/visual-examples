package org.example.pageobjects;

import lombok.Getter;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

public class HomePage extends BasePage {
    @Override
    protected String getUrlPath() { return ""; }


    @Getter
    private final By contactLink = By.cssSelector("a[data-test=\"nav-contact\"]");
    @Getter
    private final By signInLink = By.cssSelector("a[data-test=\"nav-sign-in\"]");
    @Getter
    private final By logoLink = By.id("Layer_1");

    private final By firstCard = By.cssSelector(".card-img-top:first-child");

    @Override
    public void sync() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        wait.until(ExpectedConditions.presenceOfElementLocated(firstCard));
    }

    @Override
    public List<WebElement> getIgnoreRegions() {
        return null;
    }

    public HomePage(WebDriver driver) { super(driver); }

    public LoginPage navigateToLogin() {
        WebElement signIn = driver.findElement(signInLink);
        signIn.click();
        LoginPage loginPage = new LoginPage(driver);
        loginPage.sync();
        return loginPage;
    }

    public ContactPage navigateToContactPage() {
        WebElement contact = driver.findElement(contactLink);
        contact.click();
        ContactPage contactPage = new ContactPage(driver);
        contactPage.sync();
        return contactPage;
    }
}
