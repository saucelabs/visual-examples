package org.example;

import com.saucelabs.visual.Options;
import org.example.pageobjects.ContactPage;
import org.example.pageobjects.LoginPage;
import org.junit.jupiter.api.Test;

public class NavigateTest extends SauceVisualBaseTest {

    private final String adminLogin = "admin@practicesoftwaretesting.com";
    private final String customerLogin = "customer@practicesoftwaretesting.com";
    private final String customer2Login = "customer2@practicesoftwaretesting.com";
    private final String password = "welcome01";

    @Test
    void checkLoginPage() {
        Options options = new Options();
        options.setIgnoreElements(driver.findElements(homePage.getLogoLink()));
        visual().check("Home Page - Before Login", options);
        LoginPage loginPage = homePage.navigateToLogin();
        loginPage.login(adminLogin, password);

        visual().check("After Login", options);
    }

    @Test
    void checkContactPage() {
        Options options = new Options();
        options.setIgnoreElements(driver.findElements(homePage.getLogoLink()));
        visual().check("Home Page", options);
        ContactPage contactPage = homePage.navigateToContactPage();
        visual().check("Contact Page", options);
    }

    @Test
    void checkReturnToHomePage() {
        Options options = new Options();
        options.setIgnoreElements(driver.findElements(homePage.getLogoLink()));
        visual().check("Home Page Before", options);
        ContactPage contactPage = homePage.navigateToContactPage();
        visual().check("Contact Page", options);
        contactPage.navigateToHome();
        visual().check("Contact Page After", options);
    }

    @Test
    void checkHomePage() {
        Options options = new Options();
        options.setIgnoreElements(driver.findElements(homePage.getLogoLink()));
        visual().check("Initial Home Page", options);
    }
}
