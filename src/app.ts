/// <reference path="./express.d.ts" />
import express from "express";
import cors from 'cors';
import { Signale } from "signale";
import { createServer } from "http";
import { userRouter } from "./users/infrastructure/userRouter";
import { productRouter } from "./products/infrastructure/productRouter";
import { dataRouter, setupWebSocket } from "./sensors/infrastructure/dataRouter"; // Asegúrate de que la ruta es correcta

const app = express();
const server = createServer(app);
const signale = new Signale();

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use('/product', productRouter);
app.use('/data', dataRouter);

setupWebSocket(server);

server.listen(3000, () => {
  signale.success("Server online on port 3000");
});

