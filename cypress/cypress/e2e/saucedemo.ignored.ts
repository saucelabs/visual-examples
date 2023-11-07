context('Sauce Demo', () => {
  it('.type() - type into a DOM element', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('locked_user').should('have.value', 'locked_user');
    cy.get('[data-test="password"]').type('secret_sauce').should('have.value', 'secret_sauce');
    cy.sauceVisualCheck('login-page', { ignoredRegions: [
      cy.get('[data-test="username"]'),
      {
        x: 240,
        y: 800,
        width: 1520,
        height: 408
      }
    ] });
  })
});
