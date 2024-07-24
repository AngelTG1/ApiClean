import { User } from "./user";

export interface UserRepository {
  addUser(name: string, email: string, password: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
