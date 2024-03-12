describe('Sauce Visual Demo', () => {

  it(' - should be able to open the login page', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.intercept('/service-worker.js', {body: undefined})
    cy.get('.login_container').should('be.visible');
    cy.sauceVisualCheck('Before Login', {
      captureDom: true
    });
  })

  it(` - should be able to login with a standard user`, () => {
    cy.visit('https://www.saucedemo.com/');
    cy.intercept('/service-worker.js', {body: undefined})
    const USER = Cypress.env('VISUAL_CHECK') ? 'visual_user' : 'standard_user';
    cy.get('[data-test="username"]').type(USER).should('have.value', USER);
    cy.get('[data-test="password"]').type('secret_sauce').should('have.value', 'secret_sauce');
    cy.get('input[data-test="login-button"]').click();
    cy.get('.inventory_list').should('be.visible');
    cy.sauceVisualCheck('Inventory Page', {
      captureDom: true
    });
  })

  it(' - should not be able to login with a locked user', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.intercept('/service-worker.js', {body: undefined})
    cy.get('[data-test="username"]').type('locked_out_user').should('have.value', 'locked_out_user');
    cy.get('[data-test="password"]').type('secret_sauce').should('have.value', 'secret_sauce');
    cy.get('input[data-test="login-button"]').click();
    cy.url().should('eq', 'https://www.saucedemo.com/');
    cy.get('.error-message-container', {timeout: 10000}).should('be.visible');
    cy.sauceVisualCheck('Locked User Error Message', {
      captureDom: true
    });
  })

});
