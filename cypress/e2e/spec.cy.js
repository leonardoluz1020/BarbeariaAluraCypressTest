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
    cy.contains('h2', 'Sobre a Barbearia Alura')
      .should('be.visible')
    cy.contains('p', 'Localizada no coração da cidade a ')
      .should('be.visible')
    cy.contains('strong', 'Barbearia Alura')
      .should('be.visible')
    cy.contains('p', 'traz para o mercado o que há de melhor para o seu cabelo e barba. Fundada em 2019, a Barbearia Alura já é destaque na cidade e conquista novos clientes a cada dia.')
      .should('be.visible')
  })
  it('Verificando area do local do mapa', () => {

    cy.get('.mapa-conteudo>iframe').should('be.visible')
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
  it('Verificando video da pagina inicial', () => {
    cy.get('.video>iframe').should('be.visible')
  })
  it('Fazendo uma requisição ao http', () => {
    cy.request('https://www.youtube.com/watch?v=ILfdTXgV_Yk')
      // com request podemos fazer requisição a nivel de rede
      .should(function (response) { // usando o should para fazer verificações junto com uma função de callback que recebe a resposta da requisição, 
        const { status, } = response // com a resposta da requisição estamos desestruturando o status
        expect(status).to.equal(200) // com o expect verifica no status se é igual a 200

      })
  })
  it('Fazendo requisição usando method Post', () => {
    cy.request({
      method: 'POST',
      url: 'https://www.youtube.com/youtubei/v1/log_event?alt=json&key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8'
    }).then((res) => {
      expect(res.status).to.be.equal(200)
      expect(res.statusText).to.be.equal("OK")
      expect(res.body).is.not.empty
      expect(res.isOkStatusCode).to.be.equal(true)
    })
  })

})