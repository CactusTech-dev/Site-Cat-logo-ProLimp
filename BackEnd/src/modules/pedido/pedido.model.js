export default class Pedido {
  constructor({ id, ident, numero, observacao, produtos }) {
    this.id = id;
    this.ident = ident;
    this.numero = numero;
    this.observacao = observacao;
    this.produtos = produtos;
  }
}
