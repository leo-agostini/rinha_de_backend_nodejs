import Transacao from "../../domain/entities/Transacao";
import { TransacaoDTO } from "../../infra/dtos/Transacao";

export default interface TransacaoDao {
  criarTransacaoEAtualizarSaldo(
    transacao: Transacao
  ): Promise<TransacaoDTO | null>;
}
