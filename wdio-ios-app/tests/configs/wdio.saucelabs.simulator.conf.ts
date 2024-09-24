import type { Options } from '@wdio/types';
import { config as sauceSharedConfig } from './wdio.saucelabs.shared.conf.ts';

const build = `Sauce Demo Test - ${new Date().getTime()}`;

export const config: Options.Testrunner = {
  ...sauceSharedConfig,
  // ============
  // Capabilities
  // ============
  // For all capabilities please check
  // https://saucelabs.com/products/platform-configurator
  // and http://appium.io/docs/en/2.0/guides/caps/
  // For available devices please check
  // https://app.saucelabs.com/live/app-testing
  capabilities: [
    {
      platformName: 'iOS',
      'appium:app': `storage:${process.env.SIMULATOR_APP_FILEID}`,
      'appium:deviceName': 'iPhone Instant Simulator',
      'appium:platformVersion': 'current_major',
      'appium:automationName': 'XCUITest',
      'sauce:options': {
        name: `wdio-ios-app - Simulator`,
        build,
      },
    }
  ],
};
