import { ErrorResponse, SuccessResponse } from "../types";

// function to return success responses in a standard format
export function successResponse<T>(
  data: T,
  message = "Success",
  page?: number | undefined,
  pageSize: number = 10, // default page size is 10
  totalRecords?: number
): SuccessResponse {
  const successResponseObj = {
    success: true,
    data,
    message,
    timestamp: new Date().toISOString(),
  } as SuccessResponse;

  if (page) {
    const totalPages = totalRecords ? Math.ceil(totalRecords/pageSize) : null;
    const hasPreviousPage =  page > 1;
    const hasNextPage =  totalPages ? page < totalPages : false;
    const nextPage = hasNextPage ? page + 1 : null;
    const previousPage = hasPreviousPage ? page - 1 : null;
    successResponseObj.pagination = {
      page,
      pageSize,
      totalRecords,
      totalPages,
      hasNextPage,
      hasPreviousPage,
      nextPage,
      previousPage
    }
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
