describe('Sauce Visual Demo', () => {

  it('should be able to open the login page', () => {
    openSauceDemoPage();
    cy.get('.login_container').should('be.visible');
    cy.sauceVisualCheck('Before Login', {
      captureDom: true
    });
  })

  it(`should be able to login with a standard user`, () => {
    openSauceDemoPage();
    const USER = Cypress.env('VISUAL_CHECK') ? 'visual_user' : 'standard_user';
    cy.get('[data-test="username"]').type(USER).should('have.value', USER);
    cy.get('[data-test="password"]').type('secret_sauce').should('have.value', 'secret_sauce');
    cy.sauceVisualCheck('Before Login', {
      captureDom: true,
      regions: [
        {element: cy.get('[data-test="username"]'), enableOnly: []},
        {element: cy.get('[data-test="password"]'), enableOnly: ['style']},
      ],
    })
    cy.get('input[data-test="login-button"]').click();
    cy.get('.inventory_list').should('be.visible');
    cy.sauceVisualCheck('Inventory Page', {
      captureDom: true
    });
  })

  it('should not be able to login with a locked user', () => {
    openSauceDemoPage();
    cy.get('[data-test="username"]').type('locked_out_user').should('have.value', 'locked_out_user');
    cy.get('[data-test="password"]').type('secret_sauce').should('have.value', 'secret_sauce');
    cy.get('input[data-test="login-button"]').click();
    cy.url().should('eq', 'https://www.saucedemo.com/');
    cy.get('.error-message-container').should('be.visible');
    cy.sauceVisualCheck('Locked User Error Message', {
      captureDom: true
    });
  })

  function openSauceDemoPage() {
    // service workers can break Cypress (https://github.com/cypress-io/cypress/issues/16192)
    cy.intercept('/service-worker.js', {body: undefined});
    cy.visit('https://www.saucedemo.com/');
  }

});
