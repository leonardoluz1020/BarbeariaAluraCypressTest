describe('Barbearia Alura', () => {

  beforeEach(() => {
    // Dado que ao acessar o link
    cy.visit('./../../src/index.html')
  })
  it('Visitando links ancora da pagina inicial', () => {    
    cy.contains('a', 'Home')  // visita pagina inicial     
      .should('be.visible')
      .click()
      .title()      
      .should('be.equal', 'Barbearia Alura')
    cy.contains('a', 'Produtos') // visita pagina de produtos
      .should('be.visible')
      .click()
      .title()
      .should('be.equal', 'Produtos - Barbearia Alura')
      cy.contains('a', 'Contato') // visita pagina de contato
      .should('be.visible')
      .click()
      .title()
      .should('be.equal', 'Contato - Barbearia Alura')
  })
  it.only('Verificando area do local do mapa',()=>{
    cy.contains('p','Nosso estabelecimento está localizado no coração da cidade')
    .should('be.visible')
  })

})