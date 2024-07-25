"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProductController = void 0;
class AddProductController {
    constructor(addProductUseCase) {
        this.addProductUseCase = addProductUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, price, stock, quantity } = req.body;
                const newProduct = yield this.addProductUseCase.run(name, price, stock, quantity);
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
                }
                else {
                    res.status(400).json({
                        status: "error",
                        data: [],
                        message: "Error Creating Product"
                    });
                }
            }
            catch (error) {
                console.error("Error in Controller", error);
                res.status(500).json({
                    status: "error",
                    message: "Server Error"
                });
            }
        });
    }
}
exports.AddProductController = AddProductController;
