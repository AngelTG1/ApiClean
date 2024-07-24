import { Product } from "./product";

export interface ProductRepository {
  addProduct(name: string, price: number, stock: number, quantity: number): Promise<Product | null>;
}
