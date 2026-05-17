// utility to create custom error handling objects for the app, to be used by centralized error handler middleware
export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;

    // maintain proper stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}
