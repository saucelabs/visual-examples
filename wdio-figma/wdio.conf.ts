import { SauceVisualServiceOptions } from '@saucelabs/wdio-sauce-visual-service';
import { Browser, DiffingMethodSensitivity, OperatingSystem } from '@saucelabs/visual';

export const config: WebdriverIO.Config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',

    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    region: 'us',
    specs: [
        './tests/**/*.ts'
    ],
    exclude: [],
    maxInstances: 10,
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [
        'sauce',
        [
            '@saucelabs/wdio-sauce-visual-service',
            // The options for the Sauce Visual service
            {
                diffingMethodSensitivity: DiffingMethodSensitivity.Low,
                // Override baselines to match against figma. These settings can differ depending
                // on how much time you put into categorizing your Figma files. If you use accurate
                // test and suite names in your figma files, you only need to override the remaining
                // items.
                baselineOverride: {
                    browser: Browser.Figma,
                    operatingSystem: OperatingSystem.Unknown,
                    operatingSystemVersion: null,
                    device: null,
                    // These two can be omitted if you're accurately naming your test & suite names
                    testName: null,
                    suiteName: null,
                },
            } satisfies SauceVisualServiceOptions,
        ],
    ],

    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    baseUrl: 'https://www.saucedemo.com',


    capabilities: [
        {
            browserName: 'chrome',
            browserVersion: 'latest',
            platformName: 'Windows 10',
            'sauce:options': {
                screenResolution: '1920x1200',
            },
            'goog:chromeOptions': {
                args: ['enable-features=OverlayScrollbar'],
                prefs: {
                    "profile.password_manager_leak_detection": false,
                },
            },
        },
        {
            browserName: 'firefox',
            browserVersion: 'latest',
            platformName: 'Windows 10',
            'sauce:options': {
                screenResolution: '1920x1200',
            },
        },
    ],

    // This before hook is needed to match browser viewport heights across environments.
    before: async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Resize all windows to small, static size
      await browser.setWindowRect(0, 0, 800, 600);
      // Calculate the difference between the window outer dimensions and document dimensions
      const [width, height] = await driver.executeScript(`
      return [window.outerWidth - window.innerWidth + arguments[0],
            window.outerHeight - window.innerHeight + arguments[1]];
            `, [1280, 1110]);
      await browser.setWindowRect(0, 0, width, height);
    },
}
