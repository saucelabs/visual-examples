package org.example;

import com.saucelabs.visual.Options;
import org.example.pageobjects.ContactPage;
import org.example.pageobjects.DashboardPage;
import org.example.pageobjects.LoginPage;
import org.junit.jupiter.api.Test;


public class ParallelTest extends SauceVisualBaseTest {
    @Test
    void checkHomePage() {
        Options options = new Options();
        options.setIgnoreElements(driver.findElements(homePage.getLogoLink()));
        visual().check("Initial Home Page", options);
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
    void checkDashboardPage() {
        Options options = new Options();
        options.setIgnoreElements(driver.findElements(homePage.getLogoLink()));
        visual().check("Home Page - Before Login", options);
        LoginPage loginPage = homePage.navigateToLogin();
        DashboardPage dashboardPage = loginPage.loginAdmin();
        options.setIgnoreElements(dashboardPage.getIgnoreRegions());
        visual().check("Dashboard Page", options);
    }

    @Test
    void checkContactPage() {
        Options options = new Options();
        options.setIgnoreElements(driver.findElements(homePage.getLogoLink()));
        visual().check("Home Page", options);
        ContactPage contactPage = homePage.navigateToContactPage();
        visual().check("Contact Page", options);
    }
}
