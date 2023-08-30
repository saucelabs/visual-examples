package org.example;

import com.saucelabs.visual.*;
import com.saucelabs.visual.model.IgnoreRegion;
import lombok.Getter;
import lombok.Setter;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

public class MyVisualApi extends VisualApi {
    @Getter @Setter
    private List<By> globalIgnoreLocators;

    @Getter @Setter
    private List<IgnoreRegion> globalIgnoreRegions;

    //TODO this will have to go as these changes are merged
    private final RemoteWebDriver driver;

    public MyVisualApi(RemoteWebDriver driver, Region region, String username, String accessKey) {
        super(driver, region, username, accessKey);
        this.driver = driver;
    }

    public MyVisualApi(RemoteWebDriver driver, String url, String username, String accessKey) {
        super(driver, url, username, accessKey);
        this.driver = driver;
    }

    @Override
    public void check(String name) {
        Options options = new Options();
        if (globalIgnoreLocators != null) {
            options.setIgnoreElements(getElementsFromLocators(globalIgnoreLocators));
        }
        if (globalIgnoreRegions != null) {
            options.setIgnoreRegions(globalIgnoreRegions);
        }

        if (globalIgnoreRegions != null || globalIgnoreLocators != null) {
            super.check(name, options);
        } else {
            super.check(name);
        }
    }

    public List<WebElement> getElementsFromLocators(List<By> locators) {
        List<WebElement> elements = new ArrayList<>(Collections.emptyList());
        for (By locator: locators) {
            elements.add(driver.findElement(locator));
        }
        return elements;
    }

    public void check(String name, Options options) {
        Options finalOptions = new Options();
        List<IgnoreRegion> finalIgnoreRegions = new ArrayList<>(Optional.ofNullable(options.getIgnoreRegions()).orElse(Collections.emptyList()));
        List<WebElement> finalIgnoreElements = new ArrayList<>(Optional.ofNullable(options.getIgnoreElements()).orElse(Collections.emptyList()));

        if (globalIgnoreRegions != null) {
            finalIgnoreRegions.addAll(globalIgnoreRegions);
        }
        if (globalIgnoreLocators != null) {
            finalIgnoreElements.addAll(getElementsFromLocators(globalIgnoreLocators));
        }

        finalOptions.setIgnoreRegions(finalIgnoreRegions.isEmpty() ? Collections.emptyList() : finalIgnoreRegions);
        finalOptions.setIgnoreElements(finalIgnoreElements.isEmpty() ? Collections.emptyList() : finalIgnoreElements);

        if (finalIgnoreRegions.isEmpty() && finalIgnoreElements.isEmpty()) {
            super.check(name, new Options());
        } else {
            super.check(name, finalOptions);
        }
    }
}
