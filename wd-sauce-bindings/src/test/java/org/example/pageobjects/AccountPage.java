package org.example.pageobjects;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;

public class AccountPage extends BasePage {
    public AccountPage(WebDriver driver) {
        super(driver);
    }

    @Override
    protected String getUrlPath() {
        return "account";
    }

    @Override
    protected void sync() {
    }
}
