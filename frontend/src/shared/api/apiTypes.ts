export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiErrorPayload {
  success: false;
  message: string;
  errors?: Record<string, string>;
}

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly errors?: Record<string, string>;

  constructor(
    statusCode: number,
    message: string,
    errors?: Record<string, string>,
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
