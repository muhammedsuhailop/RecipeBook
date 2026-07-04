import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { ApiError } from "../utils/ApiError";
import { HttpStatus } from "../constants/httpStatus.constants";

export const validateParams = (
  schema: ZodSchema,
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return (req, _res, next) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      const message = result.error.issues
        .map((issue) => issue.message)
        .join(", ");
      throw new ApiError(HttpStatus.BAD_REQUEST, message);
    }

    req.params = result.data as typeof req.params;
    next();
  };
};
