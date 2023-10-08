package org.example.config;

import com.saucelabs.saucebindings.options.SauceOptions;
import org.example.ParallelTest;

public class ChromeTests extends ParallelTest {
    @Override
    public SauceOptions createSauceOptions() {
        return SauceOptions.chrome().build();
    }
}
