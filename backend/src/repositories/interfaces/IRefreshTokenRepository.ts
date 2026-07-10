import { RefreshToken } from "../../domain/entities/RefreshToken";
import { ICreateRepository } from "./ICreateRepository";

export interface CreateRefreshTokenPayload {
  userId: string;
  hashedToken: string;
  expiresAt: Date;
}

export interface IRefreshTokenRepository extends ICreateRepository <RefreshToken, CreateRefreshTokenPayload> {
  findByHashedToken(hashedToken: string): Promise<RefreshToken | null>;
  deleteByHashedToken(hashedToken: string): Promise<void>;
  deleteByUserId(userId: string): Promise<void>;
  deleteExpired(): Promise<void>;
  update(id: string, payload: CreateRefreshTokenPayload): Promise<RefreshToken>;
}
