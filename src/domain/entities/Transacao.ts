import DescricaoInvalida from "../errors/DescricaoInvalida";
import OperacaoInvalida from "../errors/OperacaoInvalida";
import ValorInvalido from "../errors/ValorInvalido";

export default class Transacao {
  constructor(
    public readonly id: string | null,
    public readonly clienteId: number,
    public readonly valor: number,
    public readonly data_transacao: Date,
    public readonly tipo: "d" | "c",
    public readonly descricao: string
  ) {
    if (tipo !== "d" && tipo !== "c") throw new OperacaoInvalida();
    if (!descricao || descricao?.length < 1 || descricao?.length > 10) {
      throw new DescricaoInvalida();
    }
    if (!Number.isInteger(Number(valor))) throw new ValorInvalido();
  }
}
