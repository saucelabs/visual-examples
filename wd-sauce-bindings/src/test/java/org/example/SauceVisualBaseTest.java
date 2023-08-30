package org.example;

import com.saucelabs.saucebindings.DataCenter;
import com.saucelabs.saucebindings.junit5.SauceBaseTest;
import com.saucelabs.saucebindings.options.SauceOptions;
import com.saucelabs.visual.Region;
import io.github.cdimascio.dotenv.Dotenv;
import org.example.pageobjects.HomePage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.parallel.Execution;
import org.junit.jupiter.api.parallel.ExecutionMode;

import java.util.List;

@Execution(ExecutionMode.CONCURRENT)
public abstract class SauceVisualBaseTest extends SauceBaseTest {
    protected static ThreadLocal<MyVisualApi> threadLocalVisual = ThreadLocal.withInitial(() -> null);

    protected HomePage homePage;

    @BeforeEach
    public void init() {
        Dotenv dotenv = Dotenv.load();
        String username = dotenv.get("SAUCE_USERNAME");
        String accessKey = dotenv.get("SAUCE_ACCESS_KEY");

        MyVisualApi visual = new MyVisualApi(driver, Region.US_WEST_1, username, accessKey);
        threadLocalVisual.set(visual);

        homePage = new HomePage(driver);
        homePage.open();
        homePage.sync();
        visual().setGlobalIgnoreLocators(homePage.getIgnoreLocators());
    }

    protected MyVisualApi visual() {
        return threadLocalVisual.get();
    }

    @Override
    public SauceOptions createSauceOptions() {
        return SauceOptions.chrome()
                .setTags(List.of("some-uuid"))
                .build();
    }
}
