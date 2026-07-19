import { IAuthService, AuthTokens } from "./IAuthService";
import { IUserRepository } from "../../../repositories/interfaces/IUserRepository";
import { IRefreshTokenRepository } from "../../../repositories/interfaces/IRefreshTokenRepository";
import { RegisterDto } from "../dto/RegisterDto";
import { LoginDto } from "../dto/LoginDto";
import { RegisterResponse } from "../responses/RegisterResponse";
import { LoginResponse } from "../responses/LoginResponse";
import { RefreshTokenResponse } from "../responses/RefreshTokenResponse";
import { hashPassword, comparePassword } from "../../../utils/hash";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../../utils/jwt";
import { hashToken } from "../../../utils/tokenHash";
import { ApiError } from "../../../utils/ApiError";
import { HttpStatus } from "../../../constants/httpStatus.constants";
import { AuthMessages } from "../../../constants/authMessages.constants";
import { env } from "../../../config/env";
import { logger } from "../../../config/logger";
import ms from "ms";

const refreshTokenTtlMs = ms(env.JWT_REFRESH_EXPIRES as ms.StringValue);

export class AuthService implements IAuthService {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  public async register(
    dto: RegisterDto,
  ): Promise<{ response: RegisterResponse; tokens: AuthTokens }> {
    const existingEmail = await this._userRepository.findByEmail(dto.email);
    if (existingEmail) {
      throw new ApiError(HttpStatus.CONFLICT, AuthMessages.EMAIL_EXISTS);
    }

    const existingPhone = await this._userRepository.findByPhone(dto.phone);
    if (existingPhone) {
      throw new ApiError(HttpStatus.CONFLICT, AuthMessages.PHONE_EXISTS);
    }

    const hashedPassword = await hashPassword(dto.password);
    const user = await this._userRepository.create({
      ...dto,
      password: hashedPassword,
    });

    const tokens = await this.issueTokens(user.id, user.name);
    logger.info(`New user registered: userId=${user.id}`);

    return { response: { name: user.name, email: user.email }, tokens };
  }

  public async login(
    dto: LoginDto,
  ): Promise<{ response: LoginResponse; tokens: AuthTokens }> {
    const user = await this._userRepository.findByEmail(dto.email);
    if (!user) {
      throw new ApiError(
        HttpStatus.UNAUTHORIZED,
        AuthMessages.INVALID_CREDENTIALS,
      );
    }

    const isPasswordValid = await comparePassword(dto.password, user.password);
    if (!isPasswordValid) {
      logger.warn(`Failed login attempt: email=${dto.email}`);
      throw new ApiError(
        HttpStatus.UNAUTHORIZED,
        AuthMessages.INVALID_CREDENTIALS,
      );
    }

    const tokens = await this.issueTokens(user.id, user.name);
    logger.info(`User logged in: userId=${user.id}`);

    return { response: { name: user.name, email: user.email }, tokens };
  }

  public async logout(rawRefreshToken: string): Promise<void> {
    if (!rawRefreshToken) {
      throw new ApiError(
        HttpStatus.BAD_REQUEST,
        AuthMessages.REFRESH_TOKEN_MISSING,
      );
    }

    const hashedToken = hashToken(rawRefreshToken);

    const refreshToken =
      await this._refreshTokenRepository.findByHashedToken(hashedToken);

    if (!refreshToken) {
      throw new ApiError(
        HttpStatus.UNAUTHORIZED,
        AuthMessages.REFRESH_TOKEN_INVALID,
      );
    }

    await this._refreshTokenRepository.deleteByUserId(refreshToken.userId);
    logger.info("User logged out and session invalidated");
  }

  public async refreshToken(
    rawRefreshToken: string,
  ): Promise<{ response: RefreshTokenResponse; tokens: AuthTokens }> {
    if (!rawRefreshToken) {
      throw new ApiError(
        HttpStatus.UNAUTHORIZED,
        AuthMessages.REFRESH_TOKEN_MISSING,
      );
    }

    let payload;
    try {
      payload = verifyRefreshToken(rawRefreshToken);
    } catch {
      throw new ApiError(
        HttpStatus.UNAUTHORIZED,
        AuthMessages.REFRESH_TOKEN_INVALID,
      );
    }

    const hashedIncomingToken = hashToken(rawRefreshToken);
    const storedToken =
      await this._refreshTokenRepository.findByHashedToken(hashedIncomingToken);

    if (!storedToken) {
      throw new ApiError(
        HttpStatus.UNAUTHORIZED,
        AuthMessages.REFRESH_TOKEN_INVALID,
      );
    }

    if (storedToken.expiresAt.getTime() < Date.now()) {
      throw new ApiError(
        HttpStatus.UNAUTHORIZED,
        AuthMessages.REFRESH_TOKEN_EXPIRED,
      );
    }

    const user = await this._userRepository.findById(payload.userId);
    if (!user) {
      throw new ApiError(HttpStatus.NOT_FOUND, AuthMessages.USER_NOT_FOUND);
    }

    const newAccessToken = generateAccessToken({
      userId: user.id,
      name: user.name,
    });
    const newRefreshToken = generateRefreshToken({
      userId: user.id,
      name: user.name,
    });
    const newHashedToken = hashToken(newRefreshToken);

    await this._refreshTokenRepository.update(storedToken.id, {
      userId: user.id,
      hashedToken: newHashedToken,
      expiresAt: new Date(Date.now() + refreshTokenTtlMs),
    });

    logger.info(`Refresh token rotated: userId=${user.id}`);

    return {
      response: { name: user.name, email: user.email },
      tokens: { accessToken: newAccessToken, refreshToken: newRefreshToken },
    };
  }

  private async issueTokens(userId: string, name: string): Promise<AuthTokens> {
    const accessToken = generateAccessToken({ userId, name });
    const refreshToken = generateRefreshToken({ userId, name });
    const hashedRefreshToken = hashToken(refreshToken);

    await this._refreshTokenRepository.create({
      userId,
      hashedToken: hashedRefreshToken,
      expiresAt: new Date(Date.now() + refreshTokenTtlMs),
    });

    return { accessToken, refreshToken };
  }
}

void env;
