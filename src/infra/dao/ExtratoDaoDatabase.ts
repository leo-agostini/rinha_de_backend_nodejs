import ExtratoDao from "../../application/dao/ExtratoDao";
import DatabaseConnection from "../database/database-connection";
import { ExtratoDTO } from "../dtos/Extrato";
export default class ExtratoDaoDatabase implements ExtratoDao {
  constructor(private readonly databaseConnection: DatabaseConnection) {}

  async getExtrato(clienteId: number): Promise<ExtratoDTO> {
    const databaseClient = await this.databaseConnection.client();
    const [result] = (
      await databaseClient.query("select extratos($1)", [clienteId])
    ).rows;
    databaseClient.release();
    return result.extratos as ExtratoDTO;
  }
}
