package org.example.pageobjects;

import lombok.Getter;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class ProductPage extends BasePage {
    public ProductPage(WebDriver driver) { super(driver); }

    @Getter
    private By productImage = By.cssSelector(".figure-img");

    @Override
    protected String getUrlPath() {
        return "#/product/";
    }

    @Override
    protected void sync() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(productImage));
    }
}
