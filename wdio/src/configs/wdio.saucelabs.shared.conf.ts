import type { Options } from '@wdio/types';
import { browser } from '@wdio/globals';
import { SauceVisualService } from '@saucelabs/wdio-sauce-visual-service';
import { config as sharedConfig } from './wdio.shared.conf.ts';
import { getSauceCredentials } from '../helpers.ts';

//
// Get the Sauce Labs credentials
const { sauceUsername, sauceAccessKey } = await getSauceCredentials();

export const config: Options.Testrunner = {
  ...sharedConfig,
  //
  // =================
  // Service Providers
  // =================
  user: sauceUsername,
  key: sauceAccessKey,
  region: (process.env.REGION || 'us') as Options.SauceRegions,
  //
  // ============
  // Capabilities
  // ============
  // Are not configured here, they can be found in:
  // - wdio.saucelabs.desktop.conf.ts
  //
  // ========
  // Services
  // ========
  services: (sharedConfig.services || []).concat([
    //
    // This service is needed for WDIO to make sure it can connect to Sauce Labs to:
    // - automatically update the names
    // - automatically update the status (passed/failed)
    // - automatically send the stacktrace in case of a failure
    //
    'sauce',
    //
    // This service is needed for the Sauce Visual service to work
    //
    [
      SauceVisualService,
      // The options for the Sauce Visual service
      {
        buildName: 'Sauce Demo Test',
        branch: 'main',
        project: 'WDIO examples',
      },
    ],
  ]),
  // =====
  // Hooks
  // =====
  before: async (_capabilities, _specs) => {
    // Set all browsers to the "same" viewport
    // @ts-ignore
    await browser.setWindowRect(1920, 1080);
  },
};
