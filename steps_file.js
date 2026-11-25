const { faker } = require('@faker-js/faker');
const { generate } = require('gerador-validador-cpf');

// Gera um usuario novo a cada chamada, com CPF valido e telefone no formato
// que a aplicacao exibe: (11) 9XXXX-XXXX.
function novoUsuario() {
  const celular = faker.string.numeric(8);
  return {
    nome: `${faker.person.firstName()} ${faker.person.lastName()}`,
    email: faker.internet.email({ provider: 'teste.com' }).toLowerCase(),
    cpf: generate({ format: true }),
    telefone: `(11) 9${celular.slice(0, 4)}-${celular.slice(4)}`,
  };
}

module.exports = function () {
  return actor({
    novoUsuario,
  });
};
