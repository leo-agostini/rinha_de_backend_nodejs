import CustomError from "./CustomError";

export default class ClienteNaoEncontrado extends CustomError {
  constructor() {
    super("Cliente não encontrado", 404);
  }
}
