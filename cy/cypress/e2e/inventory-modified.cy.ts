describe('Check Inventory', () => {
  it('check that the inventory page looks the same', () => {
    cy.visit('https://www.saucedemo.com/')
    
    cy.screenshot('Before Login', {capture: 'viewport'})

    cy.get('[data-test="username"]').type("standard_user")
    cy.get('[data-test="password"]').type("secret_sauce")
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click({ scrollBehavior: false })
    
    cy.screenshot('Inventory Page', {capture: 'viewport'})
  })
})