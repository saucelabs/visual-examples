import Page from './page.ts';

class CheckoutCompletePage extends Page {
  constructor() {
    super('#checkout_complete_container');
  }
}

export default new CheckoutCompletePage();
