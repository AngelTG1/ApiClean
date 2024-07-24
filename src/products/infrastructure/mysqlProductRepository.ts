import { Product } from "../domain/product";
import { ProductRepository } from "../domain/productRepository";
import { query } from "../../database/mysql"; 


export class MysqlProductRepository implements ProductRepository {
  async addProduct(name: string, price: number, stock: number, quantity: number): Promise<Product | null> {
    const sql = "INSERT INTO products (name, price, stock, quantity) VALUES (?, ?, ?, ?)";
    const params = [name, price, stock, quantity];

    try {
      const result: any = await query(sql, params);
      if (result) {
        const productId = (result as any).insertId;
        return new Product(productId, name, price, stock, quantity);
      }
      return null;
    } catch (error) {
      console.error("Error in addProduct:", error);
      return null;
    }
  }
}
