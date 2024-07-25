"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./express.d.ts" />
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const signale_1 = require("signale");
const http_1 = require("http");
const userRouter_1 = require("./users/infrastructure/userRouter");
const productRouter_1 = require("./products/infrastructure/productRouter");
const dataRouter_1 = require("./sensors/infrastructure/dataRouter"); // Asegúrate de que la ruta es correcta
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const signale = new signale_1.Signale();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/user", userRouter_1.userRouter);
app.use('/product', productRouter_1.productRouter);
app.use('/data', dataRouter_1.dataRouter);
(0, dataRouter_1.setupWebSocket)(server);
server.listen(3000, () => {
    signale.success("Server online on port 3000");
});
