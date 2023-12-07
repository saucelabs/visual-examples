import { PageObjectModel, EnhancedPageObject } from 'nightwatch';

interface LoginPageElements {
  username: { selector: string };
  password: { selector: string };
}

const loginPage: PageObjectModel = {
  url: 'http://www.saucedemo.com',
  elements: {
    username: {
      selector: 'input[data-test="username"]',
    },
    password: {
      selector: 'input[data-test="password"]',
    },
    loginButton: {
      selector: 'input[data-test="login-button"]',
    },
  },
};

export default loginPage;

export interface LoginPage extends EnhancedPageObject<LoginPageElements> {}
