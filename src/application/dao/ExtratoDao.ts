import { ExtratoDTO } from "../../infra/dtos/Extrato";

export default interface ExtratoDao {
  getExtrato(clienteId: number): Promise<ExtratoDTO>;
}
