import { Data } from "../domain/data";
import { DataRepository } from "../domain/dataRepository";
import { query } from "../../database/mysql";

export class MysqlDataRepository implements DataRepository {
  async addData(temperature: string, heart_rate: string, spo2: string): Promise<Data | null> {
    const sql = "INSERT INTO data (temperature, heart_rate, spo2) VALUES (?, ?, ?)";
    const params = [temperature, heart_rate, spo2];

    try {
      const result: any = await query(sql, params);
      if (result) {
        const dataId = (result as any).insertId;
        return new Data(dataId, temperature, heart_rate, spo2);
      }
      return null;
    } catch (error) {
      console.error("Error in addData:", error);
      return null;
    }
  }

  async getData(): Promise<Data[]> {
    const sql = "SELECT * FROM data";
    try {
      const result: any[] = await query(sql, []);
      return result.map(row => new Data(row.id, row.temperature, row.heart_rate, row.spo2));
    } catch (error) {
      console.error("Error in getData:", error);
      return [];
    }
  }
}

