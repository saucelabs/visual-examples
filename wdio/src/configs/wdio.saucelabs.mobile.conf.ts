import type { Options } from '@wdio/types';
import { config as sauceSharedConfig } from './wdio.saucelabs.shared.conf.ts';

const build = `Sauce Demo Test - ${new Date().getTime()}`;

const iosCapabilitiesShared = {
  'appium:automationName': 'XCUITest',
  browserName: 'Safari',
  platformName: 'iOS',
  'sauce:options': {
    build,
  },
}
const iosCapabilities = ['15.5', '16.2'].map((iOSVersion) => ({
  ...iosCapabilitiesShared,
  'appium:platformVersion': iOSVersion,
  'appium:deviceName': 'iPhone Simulator',
  'sauce:options': {
    build,
    ...(Math.floor(+iOSVersion) >= 16 ? { appiumVersion: '2.0.0' } : {}),
  },
}));
const iosRealCapabilities = ['15'].map((iOSVersion) => ({
  ...iosCapabilitiesShared,
  'appium:platformVersion': iOSVersion,
  'appium:deviceName': 'iPhone X',
  'sauce:options': {
    appiumVersion: '2.0.0',
    build,
  },
}));

const androidCapabilitiesShared = {
  'appium:automationName': 'UiAutomator2',
  browserName: 'Chrome',
  platformName: 'Android',
  'sauce:options': {
    build
  },
}
const androidCapabilities = ['13.0', '14.0'].map(
  (androidVersion) => ({
    ...androidCapabilitiesShared,
    'appium:platformVersion': androidVersion,
    'appium:deviceName': 'Android GoogleAPI Emulator',
  })
);
const androidRealCapabilities = ['13'].map(
  (androidVersion) => ({
    ...androidCapabilitiesShared,
    'appium:platformVersion': androidVersion,
    'appium:deviceName': 'Samsung Galaxy S22',
    'sauce:options': {
      build,
    }
  })
);

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
  capabilities: [ ...iosCapabilities, ...iosRealCapabilities, ...androidCapabilities, ...androidRealCapabilities],
};
