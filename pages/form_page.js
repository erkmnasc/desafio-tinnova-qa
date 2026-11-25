const { I } = inject();

// Formulario usado para cadastrar, consultar e editar.
// CPF e telefone recebem so os digitos: a mascara e aplicada pela aplicacao.

module.exports = {
  fields: {
    nome: 'input[name=name]',
    email: 'input[name=email]',
    cpf: 'input[name=cpf]',
    telefone: 'input[name=phone]',
  },

  buttons: {
    guardar: { xpath: '//div[normalize-space(text())="GUARDAR"]' },
    atualizar: { xpath: '//div[normalize-space(text())="ATUALIZAR"]' },
    voltar: { xpath: '//div[normalize-space(text())="VOLTAR"]' },
  },

  preencher(usuario) {
    I.fillField(this.fields.nome, usuario.nome);
    I.fillField(this.fields.email, usuario.email);
    I.fillField(this.fields.cpf, usuario.cpf.replace(/\D/g, ''));
    I.fillField(this.fields.telefone, usuario.telefone.replace(/\D/g, ''));
  },

  alterarNomeEEmail(nome, email) {
    I.clearField(this.fields.nome);
    I.fillField(this.fields.nome, nome);
    I.clearField(this.fields.email);
    I.fillField(this.fields.email, email);
  },

  guardar() {
    I.click(this.buttons.guardar);
  },

  atualizar() {
    I.click(this.buttons.atualizar);
  },

  voltar() {
    I.click(this.buttons.voltar);
  },

  verDados(usuario) {
    I.seeInField(this.fields.nome, usuario.nome);
    I.seeInField(this.fields.email, usuario.email);
    I.seeInField(this.fields.cpf, usuario.cpf);
    I.seeInField(this.fields.telefone, usuario.telefone);
  },
};
