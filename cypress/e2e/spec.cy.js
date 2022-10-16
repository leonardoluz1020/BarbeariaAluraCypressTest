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
  it('Sobre a Barbearia Alura', () => {
    cy.contains('h2','Sobre a Barbearia Alura')
    .should('be.visible')
    cy.contains('p','Localizada no coração da cidade a ')
    .should('be.visible')
    cy.contains('strong','Barbearia Alura')
    .should('be.visible')
    cy.contains('p','traz para o mercado o que há de melhor para o seu cabelo e barba. Fundada em 2019, a Barbearia Alura já é destaque na cidade e conquista novos clientes a cada dia.')
    .should('be.visible')
  })
  it('Verificando area do local do mapa', () => {
    cy.contains('p', 'Nosso estabelecimento está localizado no coração da cidade')
      .should('be.visible')
  })
  it('Verificando beneficios', () => {
    cy.contains('.lista-beneficios', 'Atendimentos aos clientes')
      .should('be.visible')
    cy.contains('.lista-beneficios', 'Espaço diferenciado')
      .should('be.visible')
    cy.contains('.lista-beneficios', 'Localização')
      .should('be.visible')
    cy.contains('.lista-beneficios', 'Profissionais Qualificados')
      .should('be.visible')
    cy.contains('.lista-beneficios', 'Pontualidade')
      .should('be.visible')
    cy.contains('.lista-beneficios', 'Limpeza')
      .should('be.visible')

  })

})