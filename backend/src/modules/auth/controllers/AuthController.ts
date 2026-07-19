import { Request, Response } from "express";
import { IAuthService } from "../services/IAuthService";
import { ApiResponse } from "../../../utils/ApiResponse";
import { ApiError } from "../../../utils/ApiError";
import { setAuthCookies, clearAuthCookies } from "../../../utils/cookies";
import { HttpStatus } from "../../../constants/httpStatus.constants";
import { AuthMessages } from "../../../constants/authMessages.constants";
import { env } from "../../../config/env";

export class AuthController {
  constructor(private readonly _authService: IAuthService) {}

  public register = async (req: Request, res: Response): Promise<void> => {
    const { response, tokens } = await this._authService.register(req.body);
    setAuthCookies(res, tokens);
    res
      .status(HttpStatus.CREATED)
      .json(new ApiResponse(true, AuthMessages.REGISTER_SUCCESS, response));
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    const { response, tokens } = await this._authService.login(req.body);
    setAuthCookies(res, tokens);
    res
      .status(HttpStatus.OK)
      .json(new ApiResponse(true, AuthMessages.LOGIN_SUCCESS, response));
  };

  public logout = async (req: Request, res: Response): Promise<void> => {
    const refreshToken = req.cookies[env.REFRESH_TOKEN_COOKIE_NAME] as
      | string
      | undefined;
    if (!refreshToken) {
      throw new ApiError(
        HttpStatus.BAD_REQUEST,
        AuthMessages.REFRESH_TOKEN_MISSING,
      );
    }
    await this._authService.logout(refreshToken);
    clearAuthCookies(res);
    res
      .status(HttpStatus.OK)
      .json(new ApiResponse(true, AuthMessages.LOGOUT_SUCCESS));
  };

  public refreshToken = async (req: Request, res: Response): Promise<void> => {
    const refreshToken = req.cookies[env.REFRESH_TOKEN_COOKIE_NAME] as
      | string
      | undefined;
    const { response, tokens } = await this._authService.refreshToken(
      refreshToken ?? "",
    );
    setAuthCookies(res, tokens);
    res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse(true, AuthMessages.TOKEN_REFRESH_SUCCESS, response),
      );
  };
}
