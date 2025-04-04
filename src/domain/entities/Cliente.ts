import SaldoInsuficiente from "../errors/SaldoInsuficiente";
import Transacao from "./Transacao";

export default class Cliente {
  constructor(
    public readonly id: number,
    public saldo: number,
    public readonly limite: number
  ) {}

  public atualizarSaldo(transacao: Transacao) {
    if (transacao.tipo === "c") return (this.saldo += transacao.valor);
    const saldoAtualizado = this.saldo - transacao.valor;
    if (saldoAtualizado < this.limite) throw new SaldoInsuficiente();
    this.saldo = saldoAtualizado;
  }
}
