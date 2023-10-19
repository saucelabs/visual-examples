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
      'appium:deviceName': 'iPhone Simulator',
      'appium:platformVersion': '16.2',
      'appium:automationName': 'XCUITest',
      browserName: 'Safari',
      platformName: 'iOS',
      'sauce:options': {
        appiumVersion: '2.0.0',
        build
      },
    },
    {
      'appium:deviceName': 'iPhone 11',
      // Platform Version is not mandatory for Real Devices
      // If you want to use a specific or a range of versions then check
      // https://docs.saucelabs.com/mobile-apps/supported-devices/#dynamic-device-allocation
      // If you don't specify a specific version it will select an available iPhone, as requested in `'appium:deviceName'`,
      // with the then available OS version 
      // 'appium:platformVersion': '15',
      'appium:automationName': 'XCUITest',
      browserName: 'Safari',
      platformName: 'iOS',
      'sauce:options': {
        build,
      },
    },
    {
      'appium:deviceName': 'Android GoogleAPI Emulator',
      'appium:platformVersion': '14.0',
      'appium:automationName': 'UiAutomator2',
      browserName: 'Chrome',
      platformName: 'Android',
      'sauce:options': {
        build
      },
    },
    {
      'appium:deviceName': 'Google Pixel 8',
      'appium:automationName': 'UiAutomator2',
      // Platform Version is not mandatory for Real Devices
      // If you want to use a specific or a range of versions then check
      // https://docs.saucelabs.com/mobile-apps/supported-devices/#dynamic-device-allocation
      // If you don't specify a specific version it will select an available iPhone, as requested in `'appium:deviceName'`,
      // with the then available OS version
      // 'appium:platformVersion': '14',
      browserName: 'Chrome',
      platformName: 'Android',
      'sauce:options': {
        appiumVersion: '2.0.0',
        build
      },
    }
  ],
};
