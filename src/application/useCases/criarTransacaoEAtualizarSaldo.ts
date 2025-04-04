import Transacao from "../../domain/entities/Transacao";
import SaldoInsuficiente from "../../domain/errors/SaldoInsuficiente";
import { TransacaoDTO } from "../../infra/dtos/Transacao";
import TransacaoDao from "../dao/TransacaoDao";

export default class CriarTransacaoEAtualizarSaldo {
  constructor(private readonly transacaoDao: TransacaoDao) {}

  async execute({ clienteId, valor, tipo, descricao }: Input): Promise<Output> {
    const transacao = new Transacao(
      null,
      clienteId,
      valor,
      new Date(),
      tipo,
      descricao
    );

    const transacaoDto = await this.transacaoDao.criarTransacaoEAtualizarSaldo(
      transacao
    );
    if (!transacaoDto) throw new SaldoInsuficiente();
    return transacaoDto;
  }
}

type Input = {
  clienteId: number;
  valor: number;
  tipo: "d" | "c";
  descricao: string;
};

type Output = TransacaoDTO;
