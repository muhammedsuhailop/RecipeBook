import { RefreshToken } from "../../domain/entities/RefreshToken";

export interface CreateRefreshTokenPayload {
  userId: string;
  hashedToken: string;
  expiresAt: Date;
}

export interface IRefreshTokenRepository {
  create(payload: CreateRefreshTokenPayload): Promise<RefreshToken>;
  findByHashedToken(hashedToken: string): Promise<RefreshToken | null>;
  deleteByHashedToken(hashedToken: string): Promise<void>;
  deleteByUserId(userId: string): Promise<void>;
  deleteExpired(): Promise<void>;
  update(id: string, payload: CreateRefreshTokenPayload): Promise<RefreshToken>;
}
