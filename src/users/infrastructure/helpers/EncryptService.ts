import bcrypt from 'bcrypt';
import { IEncryptService } from '../../application/services/IEncryptService';

export class EncryptService implements IEncryptService {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
