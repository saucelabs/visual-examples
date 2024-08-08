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
      // You should always target a specific device and OS version.
      // Different devices will generate different baselines as their screen size and pixel density are different.
      // See: https://docs.saucelabs.com/visual-testing/mobile-native-testing/#best-practices
      'appium:deviceName': 'Google Pixel 8',
      'appium:platformVersion': '14',
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:app': `storage:${process.env.APP_FILEID}`,
      'sauce:options': {
        appiumVersion: 'latest',
        build
      },
    }
  ],
};
