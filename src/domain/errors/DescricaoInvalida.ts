import CustomError from "./CustomError";

export default class DescricaoInvalida extends CustomError {
  constructor() {
    super("Descrição inválida", 422);
  }
}
