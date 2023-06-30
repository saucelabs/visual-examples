import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CataloguePage extends Page {
    /**
     * define selectors using getter methods
     */
    public get addBackPackToCartButton () {
        return $('#add-to-cart-sauce-labs-backpack');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async addBackPackToCart() {
        await this.addBackPackToCartButton.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open('/inventory.html');
    }
}

export default new CataloguePage();
