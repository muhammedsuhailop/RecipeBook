import { RefreshTokenModel } from "../models/RefreshTokenModel";
import { toRefreshTokenEntity } from "../mappers/refreshToken.mapper";
import { RefreshToken } from "../../domain/entities/RefreshToken";
import {
  IRefreshTokenRepository,
  CreateRefreshTokenPayload,
} from "../interfaces/IRefreshTokenRepository";

export class RefreshTokenRepository implements IRefreshTokenRepository {
  public async create(
    payload: CreateRefreshTokenPayload,
  ): Promise<RefreshToken> {
    const document = await RefreshTokenModel.create(payload);
    return toRefreshTokenEntity(document);
  }

  public async findByHashedToken(
    hashedToken: string,
  ): Promise<RefreshToken | null> {
    const document = await RefreshTokenModel.findOne({ hashedToken });
    return document ? toRefreshTokenEntity(document) : null;
  }

  public async deleteByHashedToken(hashedToken: string): Promise<void> {
    await RefreshTokenModel.deleteOne({ hashedToken });
  }

  public async deleteByUserId(userId: string): Promise<void> {
    await RefreshTokenModel.deleteMany({ userId });
  }

  public async deleteExpired(): Promise<void> {
    await RefreshTokenModel.deleteMany({ expiresAt: { $lt: new Date() } });
  }

  public async update(
    id: string,
    payload: CreateRefreshTokenPayload,
  ): Promise<RefreshToken> {
    const document = await RefreshTokenModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
    if (!document) {
      throw new Error("Refresh token record not found during update");
    }
    return toRefreshTokenEntity(document);
  }
}
