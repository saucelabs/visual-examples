context('Sauce Demo', () => {
  it('.type() - type into a DOM element', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user').should('have.value', 'standard_user');
    cy.get('[data-test="password"]').type('secret_sauce').should('have.value', 'secret_sauce');
    cy.sauceVisualCheck('login-page');
  })
});
