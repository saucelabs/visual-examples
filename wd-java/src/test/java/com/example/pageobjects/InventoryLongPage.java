package com.example.pageobjects;

import org.openqa.selenium.WebDriver;

public class InventoryLongPage {

    private final WebDriver driver;

    public InventoryLongPage(WebDriver driver) {
        this.driver = driver;
    }

    public void open() {
        driver.get("https://www.saucedemo.com/inventory-long.html");
    }
}
