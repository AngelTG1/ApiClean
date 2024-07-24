import { Request, Response } from "express";
import { AddProductUseCase } from "../../application/addProductUseCase";

export class AddProductController {
  constructor(private addProductUseCase: AddProductUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const { name, price, stock, quantity } = req.body;
      const newProduct = await this.addProductUseCase.run(name, price, stock, quantity);

      if (newProduct) {
        res.status(201).json({
          status: "success",
          data: {
            id: newProduct.id,
            name: newProduct.name,
            price: newProduct.price,
            stock: newProduct.stock,
            quantity: newProduct.quantity
          },
          message: "Product Created"
        });
      } else {
        res.status(400).json({
          status: "error",
          data: [],
          message: "Error Creating Product"
        });
      }
    } catch (error) {
      console.error("Error in Controller", error);
      res.status(500).json({
        status: "error",
        message: "Server Error"
      });
    }
  }
}
