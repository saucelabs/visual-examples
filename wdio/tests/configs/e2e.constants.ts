const USERNAME =
  process.env.VISUAL_CHECK === 'true' ? 'visual_user' : 'standard_user';
const PASSWORD = 'secret_sauce';
export const DEFAULT_TIMEOUT = 30 * 1000;
export const PAGES = {
  CART: '/cart.html',
  CHECKOUT_COMPLETE: '/checkout-complete.html',
  CHECKOUT_PERSONAL_INFO: '/checkout-step-one.html',
  CHECKOUT_SUMMARY: '/checkout-step-two.html',
  LOGIN: '/',
  SWAG_DETAILS: '/inventory-item.html',
  SWAG_ITEMS: '/inventory.html',
  SWAG_ITEMS_LONG: '/inventory-long.html',
};
export const PRODUCTS = {
  BIKE_LIGHT: 0,
  BOLT_SHIRT: 1,
  ONE_SIE: 2,
  TATT_SHIRT: 3,
  BACKPACK: 4,
  FLEECE_JACKET: 5,
};
export const LOGIN_USERS = {
  LOCKED: {
    username: 'locked_out_user',
    password: PASSWORD,
  },
  NO_MATCH: {
    username: 'd',
    password: 'd',
  },
  NO_USER_DETAILS: {
    username: '',
    password: '',
  },
  NO_PASSWORD: {
    username: USERNAME,
    password: '',
  },
  PERFORMANCE: {
    username: 'performance_glitch_user',
    password: PASSWORD,
  },
  STANDARD: {
    username: USERNAME,
    password: PASSWORD,
  },
  VISUAL: {
    username: 'visual_user',
    password: PASSWORD,
  },
};
export const PERSONAL_INFO = {
  STANDARD: {
    firstName: 'Sauce',
    lastName: 'Bot',
    zip: '94105',
  },
  NO_FIRSTNAME: {
    firstName: '',
    lastName: 'Bot',
    zip: '94105',
  },
  NO_LAST_NAME: {
    firstName: 'Sauce',
    lastName: '',
    zip: '94105',
  },
  NO_POSTAL_CODE: {
    firstName: 'Sauce',
    lastName: 'Bot',
    zip: '',
  },
};
