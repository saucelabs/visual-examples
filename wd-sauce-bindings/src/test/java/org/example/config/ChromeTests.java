package org.example.config;

import com.saucelabs.saucebindings.options.SauceOptions;
import org.example.ParallelTest;
import org.junit.rules.TestName;

public class ChromeTests extends ParallelTest {

    TestName testName = new TestName();

    @Override
    public SauceOptions createSauceOptions() {
        return SauceOptions.chrome().build();
    }
}
