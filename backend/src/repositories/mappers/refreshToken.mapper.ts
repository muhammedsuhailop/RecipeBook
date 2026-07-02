import { RefreshTokenDocument } from "../models/RefreshTokenModel";
import { RefreshToken } from "../../domain/entities/RefreshToken";

export const toRefreshTokenEntity = (
  document: RefreshTokenDocument,
): RefreshToken => {
  return new RefreshToken(
    document.id as string,
    document.userId.toString(),
    document.hashedToken,
    document.expiresAt,
    document.createdAt,
  );
};
