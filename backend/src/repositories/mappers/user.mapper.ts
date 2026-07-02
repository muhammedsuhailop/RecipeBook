import { User } from "../../domain/entities/User";
import { UserDocument } from "../models/UserModel";

export const toUserEntity = (document: UserDocument): User => {
  return new User(
    document.id as string,
    document.name,
    document.email,
    document.phone,
    document.password,
    document.createdAt,
    document.updatedAt,
  );
};
