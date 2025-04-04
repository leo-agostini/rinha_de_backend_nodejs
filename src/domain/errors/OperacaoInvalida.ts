import CustomError from "./CustomError";

export default class OperacaoInvalida extends CustomError {
  constructor() {
    super("Operação inválida", 422);
  }
}
