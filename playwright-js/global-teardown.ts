import { FullConfig } from '@playwright/test';
import { sauceVisualTeardown } from "@saucelabs/visual-playwright";


export default async function globalTeardown(config: FullConfig) {
    await sauceVisualTeardown();
}
