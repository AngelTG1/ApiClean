import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";
import { query } from "../../database/mysql"; // Asegúrate de que la ruta es correcta

export class MysqlUserRepository implements UserRepository {
  async addUser(name: string, email: string, password: string): Promise<User | null> {
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    const params = [name, email, password];

    try {
      const result: any = await query(sql, params);
      if (result) {
        const userId = result.insertId;
        return new User(userId, name, email, password);
      }
      return null;
    } catch (error) {
      console.error("Error in addUser:", error);
      return null;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const sql = "SELECT * FROM users WHERE email = ?";
    const params = [email];

    try {
      const result: any[] = await query(sql, params);
      if (result.length > 0) {
        const { id, name, email, password } = result[0];
        return new User(id, name, email, password);
      }
      return null;
    } catch (error) {
      console.error("Error in findByEmail:", error);
      return null;
    }
  }
}
