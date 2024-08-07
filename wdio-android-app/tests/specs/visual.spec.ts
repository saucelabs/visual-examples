import { browser } from '@wdio/globals';
import LoginPage from '../pages/login.page.ts';
import MenuPage from '../pages/menu.page.ts';
import App from '../pages/app.ts';

import { DiffingMethod } from '@saucelabs/wdio-sauce-visual-service';

describe('Android Native App', () => {
  it('Displays App Catalog', async () => {
    await browser.sauceVisualCheck(`Startup`);
  });

  it('Login as User', async () => {
    await MenuPage.open();
    await MenuPage.waitForIsShown(MenuPage.loginButton);
    await MenuPage.clickLoginButton();

    if (!!process.env.VISUAL_CHECK) {
      await LoginPage.clickVisualUserButton();
    } else {
      await LoginPage.clickBobUserButton();
    }
    await LoginPage.clickLogin();
  });

  it('Check App Catalog', async () => {
    const images = await App.productImages;
    const prices = await App.productPrices;

    await browser.sauceVisualCheck(`App Catalog`, {
      regions: [
        // Ignore one image
        {
          element: [images[1]],
          enableOnly: [],
        },
        // Ignore prices changes
        {
          element: prices,
          enableOnly: [],
        },
      ],
    });
  });

  it('Captures only catalog content', async () => {
    const catalogContent = await App.catalogContent;
    await browser.sauceVisualCheck(`Catalog Fragment`, {
      clipElement: catalogContent,
    });
  });
});
