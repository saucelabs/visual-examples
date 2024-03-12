context('Sauce Demo', () => {
  it(' - should be able to login with a standard user', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user').should('have.value', 'standard_user');
    cy.get('[data-test="password"]').type('secret_sauce').should('have.value', 'secret_sauce');
    cy.get('input[data-test="login-button"]').click()
    cy.get('.inventory_list', {timeout: 10000}).should('be.visible');
    cy.sauceVisualCheck('Inventory Page', {
      captureDom: true
    });
  })
});
