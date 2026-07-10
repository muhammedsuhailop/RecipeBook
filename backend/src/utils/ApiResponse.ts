export class ApiResponse<T> {
  public readonly timestamp: string;
  constructor(
    public readonly success: boolean,
    public readonly message: string,
    public readonly data?: T,
  ) {
    this.timestamp = new Date().toISOString();
  }
}
