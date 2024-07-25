"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductController = void 0;
const mysqlProductRepository_1 = require("../infrastructure/mysqlProductRepository");
const addProductUseCase_1 = require("../application/addProductUseCase");
const addProductController_1 = require("./controller/addProductController");
// Repositorio
const mysqlProductRepository = new mysqlProductRepository_1.MysqlProductRepository();
// Casos de Uso
const addProductUseCase = new addProductUseCase_1.AddProductUseCase(mysqlProductRepository);
// Controladores
exports.addProductController = new addProductController_1.AddProductController(addProductUseCase);
