import type { Options } from '@wdio/types';
import { config as sauceSharedConfig } from './wdio.saucelabs.shared.conf.ts';

const buildName = `Sauce Demo Test - ${new Date().getTime()}`;

export const config: Options.Testrunner = {
  ...sauceSharedConfig,
  //
  // ============
  // Capabilities
  // ============
  capabilities: [
    {
      browserName: 'chrome',
      browserVersion: 'latest',
      platformName: 'Windows 11',
      'sauce:options': {
        screenResolution: '2560x1600',
        build: buildName,
      },
    },
    {
      browserName: 'firefox',
      browserVersion: 'latest',
      platformName: 'Windows 11',
      'sauce:options': {
        screenResolution: '2560x1600',
        build: buildName,
      },
    },
    {
      browserName: 'microsoftedge',
      browserVersion: 'latest',
      platformName: 'Windows 11',
      'sauce:options': {
        screenResolution: '2560x1600',
        build: buildName,
      },
    },
    {
      browserName: 'safari',
      browserVersion: 'latest',
      platformName: 'macOS 13',
      'sauce:options': {
        screenResolution: '2048x1536',
        build: buildName,
      },
    },
  ],
};
