import { MysqlProductRepository } from "../infrastructure/mysqlProductRepository";
import { AddProductUseCase } from "../application/addProductUseCase";
import { AddProductController } from "./controller/addProductController";

// Repositorio
const mysqlProductRepository = new MysqlProductRepository();

// Casos de Uso
const addProductUseCase = new AddProductUseCase(mysqlProductRepository);

// Controladores
export const addProductController = new AddProductController(addProductUseCase);
