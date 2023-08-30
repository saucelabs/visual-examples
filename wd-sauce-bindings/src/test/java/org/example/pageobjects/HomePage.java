package org.example.pageobjects;

import io.netty.buffer.search.AhoCorasicSearchProcessorFactory;
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

    private final By firstCard = By.cssSelector(".card-img-top:first-child");

    private final By productCard = By.cssSelector("h5[data-test=\"product-name\"]");

    @Override
    public void sync() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.presenceOfElementLocated(firstCard));
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

    public ProductPage navigateToProduct(String product) {
        WebElement link = locateProductLink(product);
        link.click();

        ProductPage productPage = new ProductPage(driver);
        productPage.sync();
        return productPage;
    }

    private WebElement locateProductLink(String product) {
        List<WebElement> products = driver.findElements(productCard);
        for (WebElement element: products) {
            if (product.equals(element.getText()))
                return element;
        }
        return null;
    }
}
