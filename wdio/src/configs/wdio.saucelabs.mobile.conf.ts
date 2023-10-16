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
const iosRealCapabilities = ['15', '16'].map((iOSVersion) => ({
  ...iosCapabilitiesShared,
  'appium:platformVersion': iOSVersion,
  'appium:deviceName': 'iPhone.*',
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
const androidRealCapabilities = ['13', '14'].map(
  (androidVersion) => ({
    ...androidCapabilitiesShared,
    'appium:platformVersion': androidVersion,
    'appium:deviceName': 'Google.*',
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
  capabilities: [...iosCapabilities, ...iosRealCapabilities, ...androidCapabilities, ...androidRealCapabilities],
};
