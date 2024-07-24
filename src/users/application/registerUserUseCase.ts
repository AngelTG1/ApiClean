import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";
import { IEncryptService } from "./services/IEncryptService";

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encryptService: IEncryptService
  ) {}

  async run(name: string, email: string, password: string): Promise<User | null> {
    try {
      const hashedPassword = await this.encryptService.hashPassword(password);
      const createUser = await this.userRepository.addUser(name, email, hashedPassword);
      return createUser;
    } catch (error) {
      console.error('Error in RegisterUserUseCase', error);
      return null;
    }
  }
}
