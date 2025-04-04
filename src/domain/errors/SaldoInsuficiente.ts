import CustomError from "./CustomError";

export default class SaldoInsuficiente extends CustomError {
  constructor() {
    super("Saldo insuficiente", 422);
  }
}
