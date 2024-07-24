import express from "express";
import { addProductController } from "./dependencies";
import { authMiddleware } from "../../users/infrastructure/middleware/authMiddleware";

export const productRouter = express.Router();

productRouter.post("/add", authMiddleware, addProductController.run.bind(addProductController));

// Aquí puedes agregar más rutas protegidas para productos
