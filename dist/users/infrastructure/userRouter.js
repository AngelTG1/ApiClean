"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("./dependencies");
const authMiddleware_1 = require("./middleware/authMiddleware");
/// <reference path="../express.d.ts" />
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/register", dependencies_1.registerUserController.run.bind(dependencies_1.registerUserController));
exports.userRouter.post("/login", dependencies_1.loginUserController.run.bind(dependencies_1.loginUserController));
// Rutas protegidas
exports.userRouter.get("/protected", authMiddleware_1.authMiddleware, (req, res) => {
    if (req.user) {
        const { name } = req.user;
        res.status(200).json({
            status: "success",
            message: `You have accessed a protected route, Welcome ${name}`
        });
    }
    else {
        res.status(400).json({
            status: "error",
            message: "User information not available"
        });
    }
});
