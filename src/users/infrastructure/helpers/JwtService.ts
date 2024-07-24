import jwt from 'jsonwebtoken';
import { IJwtService } from '../../application/services/IJwtService';

export class JwtService implements IJwtService {
  private readonly secret: string = 'your_jwt_secret';

  generateToken(payload: object): string {
    return jwt.sign(payload, this.secret, { expiresIn: '1h' });
  }

  verifyToken(token: string): object | null {
    try {
      return jwt.verify(token, this.secret) as object;
    } catch (error) {
      console.error('Error verifying token:', error);
      return null;
    }
  }
}
