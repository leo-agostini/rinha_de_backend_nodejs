import CriarTransacaoEAtualizarSaldo from "../../application/useCases/criarTransacaoEAtualizarSaldo";
import HttpServer from "../http/HttpServer";

export default class TransacaoController {
  constructor(
    readonly httpServer: HttpServer,
    readonly criarTransacaoEAtualizarSaldo: CriarTransacaoEAtualizarSaldo
  ) {
    httpServer.register(
      "post",
      "/clientes/:id/transacoes",
      async (params: any, body: any) => {
        const response = await criarTransacaoEAtualizarSaldo.execute({
          clienteId: params.id,
          valor: body.valor,
          tipo: body.tipo,
          descricao: body.descricao,
        });
        return response;
      }
    );
  }
}
