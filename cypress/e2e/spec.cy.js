describe('Barbearia Alura', () => {
  //Usando o repeat para criar um texto longo
  const longText = Cypress._.repeat('0123456789', 60);
  beforeEach(() => {
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
  it('Fazendo uma requisição ao HTTP google maps', () => {
    cy.request('https://www.google.com/maps/api/js/ApplicationService.GetEntityDetails?pb=!1m6!1m5!2sDigitalidade!3m2!1d-23.588766982687904!2d-46.63571834564209!4s9228955726054951659!2m2!1spt_BR!2sbr!4sNhNPY6agMKjb1sQP1NqckA4!7m1!2i3!13m1!4b1')
      // com request podemos fazer requisição a nivel de rede
      .should(function (response) { // usando o should para fazer verificações junto com uma função de callback que recebe a resposta da requisição, 
        console.log(response);
        const { status, statusText, isOkStatusCode, body } = response // com a resposta da requisição estamos desestruturando os objetos
        expect(status).to.equal(200) // com o expect verifica no status se é igual a 200
        expect(statusText).to.equal('OK')
        expect(isOkStatusCode).to.equal(true)
        expect(body).to.include('Digitalidade - Rua Capitão Cavalcanti, 38 - Vila Mariana, São Paulo - SP, 04017-000')
      })
  })
  it('Fazendo uma requisição ao HTTP youtube', () => {
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
  it('Verificando preço da pagina de produtos', () => {
    cy.contains('a', 'Produtos') // visita pagina de produtos
      .should('be.visible')
      .click()
      .title()
      .should('be.equal', 'Produtos - Barbearia Alura')
    cy.contains('.produto-preco', 'R$ 25,00').should('be.visible')
    cy.contains('.produto-preco', 'R$ 18,00').should('be.visible')
    cy.contains('.produto-preco', 'R$ 35,00').should('be.visible')
  })
  it('Verificando titulos da pagina de produtos', () => {
    cy.contains('a', 'Produtos') // visita pagina de produtos
      .should('be.visible')
      .click()
      .title()
      .should('be.equal', 'Produtos - Barbearia Alura')
    cy.contains('h2', 'Cabelo').should('be.visible')
    cy.contains('h2', 'Barba').should('be.visible')
    cy.contains('h2', 'Cabelo + Barba').should('be.visible')
  })
  it('preenche os campos obrigatórios sem o nome e enviar o formulário', () => {
    cy.acessoAoContato('a', 'Contato', 'Contato - Barbearia Alura')
    cy.get('#nomesobrenome').should('have.value', '')
    cy.get('#email').type('leonardoluz@email.com').should('have.value', 'leonardoluz@email.com')
    cy.get('#telefone').type('11945587569').should('have.value', '11945587569')
    cy.get('#mensagem').should('be.visible').type(longText, { delay: 0 })
    cy.get('input[type="radio"][value="email"]') // identificando o elemento input
      .check() // encadeou o check para marcar o radio button ou seja da check no feedback
      .should('have.value', 'email')
    cy.contains('.enviar', 'Enviar formulário').click();
    cy.get('#nomesobrenome').should('have.value', '')

  })
  it('preenche os campos obrigatórios sem o email e enviar o formulário', () => {
    cy.acessoAoContato('a', 'Contato', 'Contato - Barbearia Alura')
    cy.get('#nomesobrenome').type('Leonardo Oliveira').should('have.value', 'Leonardo Oliveira')
    cy.get('#email').should('have.value', '')
    cy.get('#telefone').type('11945587569').should('have.value', '11945587569')
    cy.get('#mensagem').should('be.visible').type(longText, { delay: 0 })
    cy.get('input[type="radio"][value="email"]') // identificando o elemento input
      .check() // encadeou o check para marcar o radio button ou seja da check no feedback
      .should('have.value', 'email')
    cy.contains('.enviar', 'Enviar formulário').click();
    cy.get('#email').should('have.value', '')

  })
  it('preenche os campos obrigatórios sem o telefone e enviar o formulário', () => {
    cy.acessoAoContato('a', 'Contato', 'Contato - Barbearia Alura')
    cy.get('#nomesobrenome').type('Leonardo Oliveira').should('have.value', 'Leonardo Oliveira')
    cy.get('#email').type('leonardoluz@email.com').should('have.value', 'leonardoluz@email.com')
    cy.get('#telefone').should('have.value', '')
    cy.get('#mensagem').should('be.visible').type(longText, { delay: 0 })
    cy.get('input[type="radio"][value="email"]') // identificando o elemento input
      .check() // encadeou o check para marcar o radio button ou seja da check no feedback
      .should('have.value', 'email')
    cy.contains('.enviar', 'Enviar formulário').click();
    cy.get('#telefone').should('have.value', '')

  })
  it('preenche os campos obrigatórios sem texto e enviar o formulário', () => {
    cy.acessoAoContato('a', 'Contato', 'Contato - Barbearia Alura')
    cy.get('#nomesobrenome').type('Leonardo Oliveira').should('have.value', 'Leonardo Oliveira')
    cy.get('#email').type('leonardoluz@email.com').should('have.value', 'leonardoluz@email.com')
    cy.get('#telefone').type('11945587569').should('have.value', '11945587569')
    cy.get('#mensagem').should('be.visible')
    cy.get('input[type="radio"][value="email"]') // identificando o elemento input
      .check() // encadeou o check para marcar o radio button ou seja da check no feedback
      .should('have.value', 'email')
    cy.contains('.enviar', 'Enviar formulário').click();
    cy.get('#mensagem').should('be.visible')

  })
  Cypress._.times(4, () => {
    it('preenchendo os campos obrigatórios do formulário', () => {
      cy.acessoAoContato('a', 'Contato', 'Contato - Barbearia Alura')
      cy.get('#nomesobrenome').type('Leonardo Oliveira da Luz', { delay: 0 }).should('have.value', 'Leonardo Oliveira da Luz')
      cy.get('#email').type('leonardo@email.com', { delay: 0 }).should('have.value', 'leonardo@email.com')
      cy.get('#telefone').type('11985859696', { delay: 0 }).should('have.value', '11985859696')
      cy.get('#mensagem').type(longText, { delay: 0 }).should('have.value', longText)
      cy.get('#radio-email').check().should('be.checked')
      cy.get('.enviar').click()
      cy.get('#nomesobrenome').should('have.value', '')
    })
  })
  it('preenchendo os campos obrigatórios do formulário e limpando', () => {
    cy.acessoAoContato('a', 'Contato', 'Contato - Barbearia Alura')
    cy.get('#nomesobrenome').type('Leonardo Oliveira da Luz', { delay: 0 }).should('have.value', 'Leonardo Oliveira da Luz').clear().should('have.value', '');
    cy.get('#email').type('leonardo@email.com').should('have.value', 'leonardo@email.com').clear().should('have.value', '');
    cy.get('#telefone').type('11985859696').should('have.value', '11985859696').clear().should('have.value', '');
    cy.get('#mensagem').type(longText, { delay: 0 }).should('have.value', longText).clear().should('have.value', '');
    cy.get('.enviar').click()
    cy.get('#nomesobrenome').should('have.value', '')
  })
  it('preenche a area de texto usando o comando invoke', () => {
    cy.acessoAoContato('a', 'Contato', 'Contato - Barbearia Alura')
    cy.get('#mensagem')// acessando o text-area
      .invoke('val', longText)// usando o invoke para colocar o valor da constante longText
      .should('have.value', longText);// verificando se o texto está com mesmo valor
  })
  it('marcar ambos checkboxes, depois desmarca o último', () => {
    cy.acessoAoContato('a', 'Contato', 'Contato - Barbearia Alura')
    cy.get('input[type="checkbox"]') // com o cy.get para pegar os elementos do input type checkbox
      .check() // marca o elemento com um check
      .should('be.checked') // verifica se está marcado o elemento
      .uncheck() // desmarca o checkbox
      .should('not.be.checked'); // verifica se não está marcado
  })
  it('marcar cada tipo de contato', () => {
    cy.acessoAoContato('a', 'Contato', 'Contato - Barbearia Alura')
    cy.get('input[type="radio"]') // usando o input para verificar a quantidade de elemento de do type="radio"
      .should('have.length', 3) // verificando e confirmando a quantidade de elementos 
      .each(function ($radio) { // usando a função .each para passar em cada um dos elementos
        cy.wrap($radio).check(); // com o comando cy.wrap empacotamos o elemento para mandar comandos de testes ex .should .check
        cy.wrap($radio).should('be.checked'); // com o .should no wrap $radio se verifica se esta checado o radio.
      })
  })
  it('selecionar o perido da manha a ser atendido por seu texto', () => {
    cy.acessoAoContato('a', 'Contato', 'Contato - Barbearia Alura')
    cy.get('#horario')
      .select('manha')
      .should('have.value', 'manha')
  })
  it('selecionar o perido da tarde a ser atendido por seu texto', () => {
    cy.acessoAoContato('a', 'Contato', 'Contato - Barbearia Alura')
    cy.get('#horario')
      .select('tarde')
      .should('have.value', 'tarde')
  })
  it('selecionar o perido da noite a ser atendido por seu texto', () => {
    cy.acessoAoContato('a', 'Contato', 'Contato - Barbearia Alura')
    cy.get('#horario')
      .select('noite')
      .should('have.value', 'noite')
  })
  it('Verificando o footer da pagina', () => {
    cy.get('.copyright')
      .should('be.visible')
    cy.contains('p', 'Copyright Barbearia Alura - 2022')
      .should('be.visible')
  })
})