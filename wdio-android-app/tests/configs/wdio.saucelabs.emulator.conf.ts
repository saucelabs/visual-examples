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
      'platformName': 'Android',
      'appium:deviceName': 'Google Pixel 3 XL GoogleAPI Emulator',
      'appium:platformVersion': 'current_major',
      'appium:app': `storage:${process.env.APP_FILEID}`,
      'appium:automationName': 'UIAutomator2',
      'sauce:options': {
        build,
        name: `wdio-android-app - Emulator`,
      }
    }
  ],
};
