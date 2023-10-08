package org.example;

import com.saucelabs.saucebindings.junit5.SauceBaseTest;
import com.saucelabs.saucebindings.options.SauceOptions;
import com.saucelabs.visual.Region;
import com.saucelabs.visual.VisualApi;
import io.github.cdimascio.dotenv.Dotenv;
import org.example.pageobjects.HomePage;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.parallel.Execution;
import org.junit.jupiter.api.parallel.ExecutionMode;

@Execution(ExecutionMode.CONCURRENT)
public class SauceVisualBaseTest extends SauceBaseTest {
    protected static ThreadLocal<VisualApi> threadLocalVisual = ThreadLocal.withInitial(() -> null);

    protected HomePage homePage;

    @BeforeEach
    public void init() {
        Dotenv dotenv = Dotenv.load();
        String username = dotenv.get("SAUCE_USERNAME");
        String accessKey = dotenv.get("SAUCE_ACCESS_KEY");

        VisualApi visual = new VisualApi(driver, Region.US_WEST_1, username, accessKey);
        threadLocalVisual.set(visual);

        homePage = new HomePage(driver);
        homePage.open();
        homePage.sync();
    }

    protected VisualApi visual() {
        return threadLocalVisual.get();
    }

    @Override
    public SauceOptions createSauceOptions() {
        return SauceOptions.chrome().build();
    }
}
