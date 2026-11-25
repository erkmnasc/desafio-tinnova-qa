const { I, home_page, form_page } = inject();

Feature('Cadastro de usuarios');

let usuario;

Before(() => {
  usuario = I.novoUsuario();
  home_page.abrir();
  home_page.adicionarUsuario();
  form_page.preencher(usuario);
  form_page.guardar();
});

Scenario('cadastrar usuario com sucesso', () => {
  home_page.verUsuarioNaLista(usuario);
}).tag('@cadastro');

Scenario('consultar os dados do usuario cadastrado', () => {
  home_page.consultar(usuario.email);
  form_page.verDados(usuario);
  form_page.voltar();
  home_page.verUsuarioNaLista(usuario);
}).tag('@consulta');

Scenario('editar nome e e-mail do usuario', () => {
  const editado = I.novoUsuario();
  home_page.editar(usuario.email);
  form_page.alterarNomeEEmail(editado.nome, editado.email);
  form_page.atualizar();
  home_page.verUsuarioNaLista({ ...usuario, nome: editado.nome, email: editado.email });
  home_page.naoVerUsuarioNaLista(usuario.email);
}).tag('@edicao');

Scenario('cancelar a remocao mantem o usuario', () => {
  home_page.excluir(usuario.email);
  home_page.cancelarRemocao();
  home_page.verUsuarioNaLista(usuario);
}).tag('@remocao');

Scenario('remover usuario com sucesso', () => {
  home_page.excluir(usuario.email);
  home_page.confirmarRemocao();
  home_page.naoVerUsuarioNaLista(usuario.email);
}).tag('@remocao');
