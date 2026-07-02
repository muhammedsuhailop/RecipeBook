import { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger";

export const requestLogger = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  logger.info(`Incoming request: ${req.method} ${req.originalUrl}`);
  next();
};
