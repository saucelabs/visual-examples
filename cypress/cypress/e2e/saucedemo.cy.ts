context('Sauce Demo', () => {
  beforeEach(() => {
  })

  it.only('.type() - type into a DOM element', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user').should('have.value', 'standard_user');
    cy.get('[data-test="password"]').type('secret_sauce').should('have.value', 'secret_sauce');
    cy.screenshot('login-image');
    cy.screenshot('visual: my-first-image');
  })

  /**
   * Skipped as Screenshot gets too big and got 504.
   */
  it.skip('.type() - type into a DOM element', () => {
    cy.visit('https://example.cypress.io/commands/actions')
    cy.get('.action-email')
        .type('fake-bg@email.com').should('have.value', 'fake-bg@email.com')
    cy.screenshot('visual: my-first-image');
  })
});