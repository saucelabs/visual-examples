package org.example.pageobjects;

import org.openqa.selenium.WebDriver;

public class ContactPage extends BasePage {
    @Override
    protected String getUrlPath() { return "contact"; }

    public ContactPage(WebDriver driver) {
        super(driver);
    }

}
