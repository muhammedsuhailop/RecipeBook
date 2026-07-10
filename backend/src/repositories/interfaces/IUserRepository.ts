import { User } from "../../domain/entities/User";
import { ICreateRepository } from "./ICreateRepository";

export interface CreateUserPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface IUserRepository extends ICreateRepository<User,CreateUserPayload> {
  findByEmail(email: string): Promise<User | null>;
  findByPhone(phone: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
