import { RegisterDto } from "../dto/RegisterDto";
import { LoginDto } from "../dto/LoginDto";
import { RegisterResponse } from "../responses/RegisterResponse";
import { LoginResponse } from "../responses/LoginResponse";
import { RefreshTokenResponse } from "../responses/RefreshTokenResponse";

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthService {
  register(
    dto: RegisterDto,
  ): Promise<{ response: RegisterResponse; tokens: AuthTokens }>;

  login(
    dto: LoginDto,
  ): Promise<{ response: LoginResponse; tokens: AuthTokens }>;

  logout(rawRefreshToken: string): Promise<void>;
  
  refreshToken(
    rawRefreshToken: string,
  ): Promise<{ response: RefreshTokenResponse; tokens: AuthTokens }>;
}
