import { test as base } from "@playwright/test";
import { sauceVisualFixtures, SauceVisualFixtures } from "@saucelabs/visual-playwright";
import { DiffingMethod } from '@saucelabs/visual';

export const test = base.extend<SauceVisualFixtures>({
    // Set up the Sauce Visual fixture, and optionally customize the global options which are sent
    // with each sauce visual check to reduce duplication.
    ...sauceVisualFixtures({
        captureDom: true,
    }),
});

export { expect } from "@playwright/test";
