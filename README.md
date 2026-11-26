# Desafio Tinnova QA

[![E2E tests](https://github.com/erkmnasc/desafio-tinnova-qa/actions/workflows/ci.yml/badge.svg)](https://github.com/erkmnasc/desafio-tinnova-qa/actions/workflows/ci.yml)

Desafio técnico de QA da Tinnova: testes E2E do cadastro de usuários da
aplicação [tinnova-teste-qa.vercel.app](https://tinnova-teste-qa.vercel.app),
com CodeceptJS e WebDriver.

## Cenários

Arquivo `steps/usuarios_test.js`. Cada cenário cadastra um usuário novo
(nome e e-mail do Faker, CPF válido gerado na hora) e confere o resultado na
tela:

- cadastrar usuário e ver os dados na listagem
- consultar o usuário e conferir os campos do formulário
- editar nome e e-mail e conferir a listagem atualizada
- cancelar a remoção e o usuário continua na lista
- remover o usuário e ele some da lista

## Estrutura

```
pages/home_page.js   tela inicial, listagem e ações da linha (consultar, editar, excluir)
pages/form_page.js   formulário de cadastro, consulta e edição
steps_file.js        gerador de massa (novoUsuario)
steps/               cenários
```

A linha do usuário é localizada pelo e-mail, que é único em cada teste. A
aplicação não tem ids nos elementos e as classes são geradas pelo
styled-components, então os botões são localizados pelo texto.

## Como rodar

Precisa de Node.js 20 ou mais novo e do Google Chrome. O driver é baixado
automaticamente pelo WebdriverIO.

```bash
npm install
npm test                # abre o navegador
npm run test:headless   # sem abrir o navegador
npx codeceptjs run --grep @remocao   # só os cenários de remoção
```

## CI

O GitHub Actions roda os testes em modo headless a cada push na `main`, em
pull requests, manualmente e toda segunda-feira (`.github/workflows/ci.yml`).
