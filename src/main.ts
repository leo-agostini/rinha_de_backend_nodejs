import CriarTransacaoEAtualizarSaldo from "./application/useCases/criarTransacaoEAtualizarSaldo";
import ExtratoController from "./infra/controller/ExtratoController";
import TransacaoController from "./infra/controller/TransacaoController";
import ExtradoDao from "./infra/dao/ExtratoDaoDatabase";
import TransacaoDaoDatabase from "./infra/dao/TransacaoDaoDatabase";
import { DatabasePgConnectionAdapter } from "./infra/database/database-connection";
import { ExpressAdapter } from "./infra/http/HttpServer";

const databaseConnection = new DatabasePgConnectionAdapter();
const httpServer = new ExpressAdapter();

const extradoDao = new ExtradoDao(databaseConnection);
const transacaoDao = new TransacaoDaoDatabase(databaseConnection);
const criarTransacaoEAtualizarSaldo = new CriarTransacaoEAtualizarSaldo(
  transacaoDao
);

new TransacaoController(httpServer, criarTransacaoEAtualizarSaldo);
new ExtratoController(httpServer, extradoDao);

httpServer.listen(8080);
