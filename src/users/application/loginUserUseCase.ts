import { UserRepository } from "../domain/userRepository";
import { IJwtService } from "./services/IJwtService";
import { IEncryptService } from "./services/IEncryptService";

export class LoginUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: IJwtService,
    private readonly encryptService: IEncryptService
  ) {}

  async run(email: string, password: string): Promise<string | null> {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (user && await this.encryptService.comparePassword(password, user.password)) {
        const token = this.jwtService.generateToken({ id: user.id, email: user.email, name: user.name });
        console.log("Generated Token:", token); // Verifica que el token se genera
        return token;
      }
      return null;
    } catch (error) {
      console.error('Error in LoginUserUseCase', error);
      return null;
    }
  }
}
