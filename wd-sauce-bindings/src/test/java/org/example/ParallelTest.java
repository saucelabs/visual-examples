package org.example;

import com.google.common.base.Charsets;
import com.saucelabs.visual.Options;
import org.example.pageobjects.ContactPage;
import org.example.pageobjects.DashboardPage;
import org.example.pageobjects.LoginPage;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.UUID;

public class ParallelTest extends SauceVisualBaseTest {

    @Test
    void checkHomePage() {
        visual().check("Initial Home Page");
    }

    @Test
    void checkReturnToHomePage() {
        visual().check("Home Page Before");
        ContactPage contactPage = homePage.navigateToContactPage();

        Options options = new Options();
        options.setIgnoreElements(visual().getElementsFromLocators(contactPage.getIgnoreLocators()));
        visual().check("Contact Page", options);
        contactPage.navigateToHome();

        visual().check("Home Page After Contact Page", options);
    }

    @Test
    void checkDashboardPage() {
        visual().check("Home Page - Before Login");
        LoginPage loginPage = homePage.navigateToLogin();
        DashboardPage dashboardPage = loginPage.loginAdmin();

        Options options = new Options();
        options.setIgnoreElements(dashboardPage.getAllIgnoreElements());
        visual().check("Dashboard Page", options);
    }

    @Test
    void checkContactPage() {
        visual().check("Home Page");
        ContactPage contactPage = homePage.navigateToContactPage();

        Options options = new Options();
        options.setIgnoreElements(visual().getElementsFromLocators(contactPage.getIgnoreLocators()));
        visual().check("Contact Page", options);
    }

//    @Test
//    void testProductPage() {
//        ProductPage contactPage = homePage.navigateToProductPage();
//
//        Options options = new Options();
//        options.setIgnoreElements(contactPage.getIgnoreRegions());
//        visual().check("Contact Page", options);
//
//    }
}
