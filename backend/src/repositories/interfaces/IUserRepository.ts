import { User } from "../../domain/entities/User";

export interface CreateUserPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface IUserRepository {
  create(payload: CreateUserPayload): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByPhone(phone: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
