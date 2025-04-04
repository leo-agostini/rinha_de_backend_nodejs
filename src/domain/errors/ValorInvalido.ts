import CustomError from "./CustomError";

export default class ValorInvalido extends CustomError {
  constructor() {
    super("Valor inválido", 422);
  }
}
