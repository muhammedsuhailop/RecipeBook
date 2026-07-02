import { Response } from "express";
import { env } from "../config/env";
import { COOKIE_OPTIONS } from "../constants/cookies";

interface AuthCookiePayload {
  accessToken: string;
  refreshToken: string;
}

export const setAuthCookies = (
  res: Response,
  payload: AuthCookiePayload,
): void => {
  const isProduction = env.NODE_ENV === "production";

  res.cookie(env.ACCESS_TOKEN_COOKIE_NAME, payload.accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    maxAge: COOKIE_OPTIONS.ACCESS_TOKEN_MAX_AGE,
    path: COOKIE_OPTIONS.PATH,
    domain: env.COOKIE_DOMAIN,
  });

  res.cookie(env.REFRESH_TOKEN_COOKIE_NAME, payload.refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    maxAge: COOKIE_OPTIONS.REFRESH_TOKEN_MAX_AGE,
    path: COOKIE_OPTIONS.PATH,
    domain: env.COOKIE_DOMAIN,
  });
};

export const clearAuthCookies = (res: Response): void => {
  res.clearCookie(env.ACCESS_TOKEN_COOKIE_NAME, {
    path: COOKIE_OPTIONS.PATH,
    domain: env.COOKIE_DOMAIN,
  });
  res.clearCookie(env.REFRESH_TOKEN_COOKIE_NAME, {
    path: COOKIE_OPTIONS.PATH,
    domain: env.COOKIE_DOMAIN,
  });
};
