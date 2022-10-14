describe('Barbearia Alura', () => {

  beforeEach(() => {
    // Dado que ao acessar o link
    cy.visit('./../../src/index.html')
  })


  it('Visitando links ancora da pagina inicial', () => {    
    cy.contains('a', 'Home')       
      .should('be.visible')
      .click()
      .title()      
      .should('be.equal', 'Barbearia Alura')
    cy.contains('a', 'Produtos')
      .should('be.visible')
      .click()
      .title()
      .should('be.equal', 'Produtos - Barbearia Alura')
      cy.contains('a', 'Contato')
      .should('be.visible')
      .click()
      .title()
      .should('be.equal', 'Contato - Barbearia Alura')
  })

})