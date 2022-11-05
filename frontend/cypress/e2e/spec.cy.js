describe('My First Test', () => {
  it('Rueba crear meta', () => {
    cy.visit('https://mind-app-b0b0f.web.app/#/')

    // cy.contains('type').click()

    // Should be on a new URL which
    // includes '/commands/actions'
    cy.url().should('include', '/commands/actions')

    // Get an input, type into it and verify
    // that the value has been updated
    cy.get('.action-email')
      .type('lam20102@uvg.edu.gt')
      .should('have.value', 'lam20102@uvg.edu.gt')
  })
})