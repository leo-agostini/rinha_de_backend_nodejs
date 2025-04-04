import ClienteNaoEncontrado from "../../domain/errors/ClienteNaoEncontrado";
import ExtradoDao from "../dao/ExtratoDaoDatabase";
import HttpServer from "../http/HttpServer";

export default class ExtratoController {
  constructor(
    readonly httpServer: HttpServer,
    readonly extradoDao: ExtradoDao
  ) {
    httpServer.register("get", "/clientes/:id/extrato", async (params: any) => {
      const extrato = await extradoDao.getExtrato(params.id);
      if (!extrato.saldo) throw new ClienteNaoEncontrado();
      return extrato;
    });
  }
}
