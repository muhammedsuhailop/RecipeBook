import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { ApiError } from "../utils/ApiError";
import { HttpStatus } from "../constants/httpStatus.constants";
import { env } from "../config/env";
import { AuthMessages } from "../constants/authMessages.constants";

export interface AuthenticatedRequest extends Request {
  authenticatedUser?: { userId: string; name: string };
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
): void => {
  const accessToken = req.cookies[env.ACCESS_TOKEN_COOKIE_NAME] as
    | string
    | undefined;

  if (!accessToken) {
    throw new ApiError(
      HttpStatus.UNAUTHORIZED,
      AuthMessages.UNAUTHORIZED_ACCESS,
    );
  }

  try {
    const payload = verifyAccessToken(accessToken);
    req.authenticatedUser = payload;
    next();
  } catch {
    throw new ApiError(
      HttpStatus.UNAUTHORIZED,
      AuthMessages.UNAUTHORIZED_ACCESS,
    );
  }
};
