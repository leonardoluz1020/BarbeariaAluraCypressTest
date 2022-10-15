# BarbeariaAluraCypressTest #

Teste de interface e2e com cypress em projeto web barbearia alura


## Pré requisitos

É necessário ter o Node.js e o npm instalados para executar este projeto.

> Usei as versões `v16.13.2` e `8.1.2` do Node.js e npm, respectivamente. Sugiro que você use as mesmas versões ou versões posteriores.

## Instalação

Execute `npm install` (ou `npm i` para a versão curta) para instalar as dependências dev.


## Testes

Você pode executar os testes simulando uma janela de visualização de desktop ou móvel.

### Área de Trabalho

Execute `npm test` (ou `npm t` para a versão curta) para executar o teste no modo headless
em uma janela de visualização da área de trabalho.

Ou execute `npm run cy:open` para abrir o Cypress no modo interativo em uma janela de visualização da área de trabalho.

### Móvel

Execute `npm run test:mobile` para executar o teste no modo headless em uma viewport móvel.

Ou execute `npm run cy:open:mobile` para abrir o Cypress no modo interativo em uma viewport móvel.
