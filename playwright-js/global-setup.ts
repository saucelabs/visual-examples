import { FullConfig } from '@playwright/test';
import { sauceVisualSetup } from "@saucelabs/visual-playwright";


export default async function globalSetup(config: FullConfig){
    await sauceVisualSetup();
}
