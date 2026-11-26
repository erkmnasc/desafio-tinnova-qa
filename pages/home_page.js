const { I } = inject();

// Tela inicial e listagem de usuarios.
// A linha do usuario e localizada pelo e-mail, que e unico em cada teste.
// Na coluna "Acoes" os icones sao, nesta ordem: consultar, editar e excluir.

const linhaDoUsuario = (email) =>
  `//div[./div/p[contains(text(), "${email}")]]`;

const acao = (email, posicao) => `${linhaDoUsuario(email)}/div[5]/div[${posicao}]`;

const botao = (texto) => ({ xpath: `//div[normalize-space(text())="${texto}"]` });

// A tela inicial e redesenhada pelo React logo depois de carregar, e os botoes
// Entrar e Adicionar podem ser recriados entre a espera e o clique (no CI isso
// acontecia com frequencia). Por isso o clique desses dois e feito dentro do
// navegador, localizando o botao no mesmo instante em que clica.
function clicarBotao(texto) {
  I.waitForVisible(botao(texto), 15);
  I.executeScript((t) => {
    const alvo = [...document.querySelectorAll('#root div')]
      .find((el) => el.children.length === 0 && el.textContent.trim() === t);
    alvo.click();
  }, texto);
}

module.exports = {
  buttons: {
    adicionar: botao('Adicionar'),
    confirmarRemocao: '.swal-button--confirm',
    cancelarRemocao: '.swal-button--cancel',
  },

  abrir() {
    I.amOnPage('/');
    clicarBotao('Entrar');
    I.waitForVisible(this.buttons.adicionar, 15);
  },

  adicionarUsuario() {
    clicarBotao('Adicionar');
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
