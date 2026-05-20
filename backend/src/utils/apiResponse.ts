// function to return success responses in a standard format
export function successResponse<T>(data: T, message = "Success") {
  return {
    success: true,
    data,
    message,
    timestamp: new Date().toISOString(),
  };
}

// function to return error responses in a standard format
export function errorResponse<T>(error: T, message = "Failure") {
  return {
    success: false,
    error,
    message,
    timestamp: new Date().toISOString()
  }
}
