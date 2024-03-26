import { browser } from "@wdio/globals";
import {setTestContext} from "../helpers/index.js";
import {LOGIN_USERS, PAGES} from "../configs/e2e.constants.js";
import InventoryPage from "../pages/inventory.page.js";

const USER =
  process.env.VISUAL_CHECK === 'true' ? LOGIN_USERS.VISUAL : LOGIN_USERS.STANDARD;
describe('Swag items long list', () => {
  it("should validate that all products are present", async () => {
    await setTestContext({
      user: USER,
      path: PAGES.SWAG_ITEMS_LONG,
    });
    await InventoryPage.waitForIsShown();

    await expect(await InventoryPage.getAmount()).toBeGreaterThan(6);

    await browser.sauceVisualCheck("Inventory overview (full page)", {
      fullPage: true,
      // You can also turn it on just by adding any option
      //     fullPage: {
      //       delayAfterScrollMs: 1500,
      //       hideAfterFirstScroll: ["#cookie-message", "#fixed-header"]
      //     },
    });
  });
})
