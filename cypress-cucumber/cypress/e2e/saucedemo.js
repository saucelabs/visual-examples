import { When, Then } from "@badeball/cypress-cucumber-preprocessor";


When('on Sauce Demo Page', () => {
  cy.intercept('/service-worker.js', {body: undefined});
  cy.visit('https://www.saucedemo.com/');
});

Then('{string} should be visible', (selector) => {
  cy.get(selector).should('be.visible');
});

Then('I capture a screenshot named {string}', (screenshotName) => {
  cy.sauceVisualCheck(screenshotName, {
    captureDom: true
  });
});

Then('I log in as {string}', (username) => {
  let user = Cypress.env('VISUAL_CHECK') ? 'visual_user' : 'standard_user';
  if (username != 'standard_user') {
    user = username;
  }
  cy.get('[data-test="username"]').type(user).should('have.value', user);
  cy.get('[data-test="password"]').type('secret_sauce').should('have.value', 'secret_sauce');
});

Then('I log in as {string} with a screenshot', (username) => {
  let user = Cypress.env('VISUAL_CHECK') ? 'visual_user' : 'standard_user';
  if (username != 'standard_user') {
    user = username;
  }
  cy.get('[data-test="username"]').type(user).should('have.value', user);
  cy.get('[data-test="password"]').type('secret_sauce').should('have.value', 'secret_sauce');

  cy.sauceVisualCheck('Before Login', {
    captureDom: true,
    regions: [
      {element: cy.get('[data-test="username"]'), enableOnly: []},
      {element: cy.get('[data-test="password"]'), enableOnly: ['style']},
    ],
  });
  cy.get('input[data-test="login-button"]').click();
});

