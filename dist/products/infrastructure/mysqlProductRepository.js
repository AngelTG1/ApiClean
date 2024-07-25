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
exports.MysqlProductRepository = void 0;
const product_1 = require("../domain/product");
const mysql_1 = require("../../database/mysql");
class MysqlProductRepository {
    addProduct(name, price, stock, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO products (name, price, stock, quantity) VALUES (?, ?, ?, ?)";
            const params = [name, price, stock, quantity];
            try {
                const result = yield (0, mysql_1.query)(sql, params);
                if (result) {
                    const productId = result.insertId;
                    return new product_1.Product(productId, name, price, stock, quantity);
                }
                return null;
            }
            catch (error) {
                console.error("Error in addProduct:", error);
                return null;
            }
        });
    }
}
exports.MysqlProductRepository = MysqlProductRepository;
