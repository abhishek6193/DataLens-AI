import { ErrorResponse, SuccessResponse } from "../types";

// function to return success responses in a standard format
export function successResponse<T>(
  data: T,
  message = "Success",
  page?: number | undefined,
  pageSize: number = 10 // default page size is 10
): SuccessResponse {
  const successResponseObj = {
    success: true,
    data,
    message,
    timestamp: new Date().toISOString(),
  } as SuccessResponse;

  if (page) {
    successResponseObj.page = page;
    successResponseObj.pageSize = pageSize;
  }

  return successResponseObj;
}

// function to return error responses in a standard format
export function errorResponse<T>(error: T, message = "Failure"): ErrorResponse {
  return {
    success: false,
    error,
    message,
    timestamp: new Date().toISOString(),
  };
}
