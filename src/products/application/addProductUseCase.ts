import { Product } from "../domain/product";
import { ProductRepository } from "../domain/productRepository";

export class AddProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async run(name: string, price: number, stock: number, quantity: number): Promise<Product | null> {
    try {
      const newProduct = await this.productRepository.addProduct(name, price, stock, quantity);
      return newProduct;
    } catch (error) {
      console.error('Error in AddProductUseCase', error);
      return null;
    }
  }
}
