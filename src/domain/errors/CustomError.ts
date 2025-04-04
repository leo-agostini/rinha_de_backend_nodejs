export default class CustomError extends Error {
  constructor(message: string, public readonly errorCode: number) {
    super(message);
  }
}
