import { StatusRepository } from "../domain/statusRepository";
import { query } from "../../database/mysql";

export class MysqlStatusRepository implements StatusRepository {
  async getStatus(): Promise<boolean> {
    const sql = "SELECT status FROM status ORDER BY id DESC LIMIT 1";
    const result: any[] = await query(sql, []);
    if (result.length === 0) {
      // Si no hay resultados, inicializa el estado
      await this.initializeStatus();
      return false;
    }
    return result[0].status;
  }

  async updateStatus(newStatus: boolean): Promise<void> {
    // Usar una subconsulta dentro de una tabla derivada para evitar el problema
    const sql = `
      UPDATE status, (SELECT id FROM status ORDER BY id DESC LIMIT 1) AS subquery
      SET status.status = ?
      WHERE status.id = subquery.id
    `;
    const result: any = await query(sql, [newStatus]);
    if (result.affectedRows === 0) {
      // Si no se ha actualizado, intenta inicializar el estado y actualizar de nuevo
      await this.initializeStatus();
      await query(sql, [newStatus]);
    }
  }

  private async initializeStatus(): Promise<void> {
    const sql = "INSERT INTO status (status) VALUES (FALSE)";
    await query(sql, []);
  }
}

