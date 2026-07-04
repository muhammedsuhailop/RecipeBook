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

  const cookieConfig = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? ("none" as const) : ("lax" as const),
    maxAge: COOKIE_OPTIONS.ACCESS_TOKEN_MAX_AGE,
    path: COOKIE_OPTIONS.PATH,
    ...(isProduction ? {} : { domain: env.COOKIE_DOMAIN }),
  };

  res.cookie(env.ACCESS_TOKEN_COOKIE_NAME, payload.accessToken, cookieConfig);

  res.cookie(env.REFRESH_TOKEN_COOKIE_NAME, payload.refreshToken, {
    ...cookieConfig,
    maxAge: COOKIE_OPTIONS.REFRESH_TOKEN_MAX_AGE,
  });
};

export const clearAuthCookies = (res: Response): void => {
  const isProduction = env.NODE_ENV === "production";

  const clearConfig = {
    path: COOKIE_OPTIONS.PATH,
    ...(isProduction ? {} : { domain: env.COOKIE_DOMAIN }),
  };

  res.clearCookie(env.ACCESS_TOKEN_COOKIE_NAME, clearConfig);
  res.clearCookie(env.REFRESH_TOKEN_COOKIE_NAME, clearConfig);
};
