import { browser } from '@wdio/globals';
import LoginPage from '../pages/login.page.ts';
import MenuPage from '../pages/menu.page.ts';
import App from '../pages/app.ts';

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
    const firstImage = (await App.productImages)[0];
    const prices = await App.productPrices;

    await browser.sauceVisualCheck(`App Catalog`, {
      captureDom: true,
      regions: [
        // Ignore any changes on the first image
        {
          element: [firstImage],
          enableOnly: [],
        },
        // Ignore pany price change
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
      captureDom: true,
      clipElement: catalogContent,
    });
  });

  it('Full Page - Check App Catalog', async () => {
    await browser.sauceVisualCheck(`Full Page - App Catalog`, {
      fullPage: {
        scrollElement: $("//androidx.recyclerview.widget.RecyclerView"),
      },
    });
  }).timeout(1000 * 60 * 6);
});
