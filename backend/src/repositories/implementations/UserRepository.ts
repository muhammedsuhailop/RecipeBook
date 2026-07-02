import { UserModel } from "../models/UserModel";
import { toUserEntity } from "../mappers/user.mapper";
import { User } from "../../domain/entities/User";
import {
  IUserRepository,
  CreateUserPayload,
} from "../interfaces/IUserRepository";

export class UserRepository implements IUserRepository {
  public async create(payload: CreateUserPayload): Promise<User> {
    const document = await UserModel.create(payload);
    return toUserEntity(document);
  }

  public async findByEmail(email: string): Promise<User | null> {
    const document = await UserModel.findOne({ email });
    return document ? toUserEntity(document) : null;
  }

  public async findByPhone(phone: string): Promise<User | null> {
    const document = await UserModel.findOne({ phone });
    return document ? toUserEntity(document) : null;
  }

  public async findById(id: string): Promise<User | null> {
    const document = await UserModel.findById(id);
    return document ? toUserEntity(document) : null;
  }
}
