export class ValidationException extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.message = message ?? "";
  }
}
