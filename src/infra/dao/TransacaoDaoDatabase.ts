import TransacaoDao from "../../application/dao/TransacaoDao";
import Transacao from "../../domain/entities/Transacao";
import DatabaseConnection from "../database/database-connection";
import { TransacaoDTO } from "../dtos/Transacao";

export default class TransacaoDaoDatabase implements TransacaoDao {
  constructor(private readonly databaseConnection: DatabaseConnection) {}

  async criarTransacaoEAtualizarSaldo(
    transacao: Transacao
  ): Promise<TransacaoDTO | null> {
    const databaseClient = await this.databaseConnection.client();
    const result = await databaseClient.query(
      "select update_saldo($1, $2, $3, $4)",
      [
        transacao.clienteId,
        transacao.valor,
        transacao.tipo,
        transacao.descricao,
      ]
    );
    databaseClient.release();
    return result.rows[0].update_saldo as TransacaoDTO;
  }
}
