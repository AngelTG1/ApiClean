import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";
import { query } from "../../database/mysql"; 

export class MysqlUserRepository implements UserRepository {

    async addUser(name: string, last_name: string): Promise<User | null> {
        const sql = "INSERT INTO users (name, last_name) VALUES (?, ?)";
        const params = [name, last_name];

        try {
            // Ejecutar la consulta SQL y obtener el ID del usuario insertado
            const result = await query(sql, params);
            if (result) {
                const userId = (result as any).insertId; // Obtener el ID del resultado
                return new User(userId, name, last_name);
            }
            return null;
        } catch (error) {
            console.error("Error in addUser:", error);
            return null;
        }
    }
}
