export class CustomErrorHandler extends Error {
  status: number;

  constructor(status: number, message: string) {
    super();

    this.status = status;
    this.message = message;
  }

  getErrorInfo() {
    if (!this.status || !this.message) {
      return {
        status: 500,
        message: "Internal Server Error",
      };
    }

    return {
      status: this.status,
      message: this.message,
    };
  }
}
