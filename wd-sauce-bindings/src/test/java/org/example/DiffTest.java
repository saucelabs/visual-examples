package org.example;

import org.junit.jupiter.api.Test;

public class DiffTest extends SauceVisualBaseTest {

    @Test
    public void forceDiff() {
        homePage.setWithBugs(true);
        homePage.open();
        visual().check("DiffTest - Before Login");
    }
}
