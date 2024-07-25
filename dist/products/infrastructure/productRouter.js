"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("./dependencies");
const authMiddleware_1 = require("../../users/infrastructure/middleware/authMiddleware");
exports.productRouter = express_1.default.Router();
exports.productRouter.post("/add", authMiddleware_1.authMiddleware, dependencies_1.addProductController.run.bind(dependencies_1.addProductController));
// Aquí puedes agregar más rutas protegidas para productos
