import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { HttpStatus } from "../constants/httpStatus.constants";
import { logger } from "../config/logger";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (error instanceof ApiError) {
    res
      .status(error.statusCode)
      .json(new ApiResponse(false, error.message, error.errors));
    return;
  }

  logger.error("Unhandled exception occurred", {
    message: error.message,
    stack: error.stack,
  });

  res
    .status(HttpStatus.INTERNAL_SERVER_ERROR)
    .json(new ApiResponse(false, "Internal server error"));
};
