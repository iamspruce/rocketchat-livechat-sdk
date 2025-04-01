export type ErrorType = "API" | "SDK";

export class APIError extends Error {
  public code: number;
  public errorType: ErrorType;
  public details?: any;

  constructor(
    code: number,
    message: string,
    errorType: ErrorType,
    details?: any
  ) {
    super(message);
    this.code = code;
    this.errorType = errorType;
    this.details = details;
  }
}
