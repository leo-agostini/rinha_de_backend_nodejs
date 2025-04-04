export interface ExtratoDTO {
  saldo: {
    total: number;
    limite: number;
    dataExtrato: string;
  };
  ultimas_transacoes: {
    valor: number;
    tipo: string;
    descricao: string;
    realizada_em: string;
  }[];
}
