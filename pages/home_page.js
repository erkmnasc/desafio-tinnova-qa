const { I } = inject();

// Tela inicial e listagem de usuarios.
// A linha do usuario e localizada pelo e-mail, que e unico em cada teste.
// Na coluna "Acoes" os icones sao, nesta ordem: consultar, editar e excluir.

const linhaDoUsuario = (email) =>
  `//div[./div/p[contains(text(), "${email}")]]`;

const acao = (email, posicao) => `${linhaDoUsuario(email)}/div[5]/div[${posicao}]`;

module.exports = {
  buttons: {
    entrar: { xpath: '//div[normalize-space(text())="Entrar"]' },
    adicionar: { xpath: '//div[normalize-space(text())="Adicionar"]' },
    confirmarRemocao: '.swal-button--confirm',
    cancelarRemocao: '.swal-button--cancel',
  },

  abrir() {
    I.amOnPage('/');
    I.waitForVisible(this.buttons.entrar, 15);
    I.retry(3).click(this.buttons.entrar);
    I.waitForVisible(this.buttons.adicionar, 15);
  },

  // A listagem e redesenhada pelo React logo depois de abrir, e o botao pode
  // ser recriado entre a espera e o clique. O retry do clique cobre isso
  // (o plugin retryFailedStep nao atua dentro do Before).
  adicionarUsuario() {
    I.waitForClickable(this.buttons.adicionar, 10);
    I.retry({ retries: 3, minTimeout: 500 }).click(this.buttons.adicionar);
    I.waitInUrl('/form');
  },

  consultar(email) {
    I.click({ xpath: acao(email, 1) });
    I.waitInUrl('/form/view/');
  },

  editar(email) {
    I.click({ xpath: acao(email, 2) });
    I.waitInUrl('/form/edit/');
  },

  excluir(email) {
    I.click({ xpath: acao(email, 3) });
    I.waitForText('Deseja mesmo remover?', 5);
  },

  confirmarRemocao() {
    I.click(this.buttons.confirmarRemocao);
  },

  cancelarRemocao() {
    I.click(this.buttons.cancelarRemocao);
  },

  verUsuarioNaLista(usuario) {
    I.waitForElement({ xpath: linhaDoUsuario(usuario.email) });
    within({ xpath: linhaDoUsuario(usuario.email) }, () => {
      I.see(usuario.nome);
      I.see(usuario.telefone);
      I.see(usuario.cpf);
    });
  },

  naoVerUsuarioNaLista(email) {
    I.waitForInvisible({ xpath: linhaDoUsuario(email) }, 5);
  },
};
