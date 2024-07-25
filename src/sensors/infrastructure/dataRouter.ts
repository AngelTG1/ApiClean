import express from "express";
import WebSocket from "ws";
import { addDataController, statusController, getDataController } from "./dependencies"; // Importa getDataController
import { authMiddleware } from "../../users/infrastructure/middleware/authMiddleware";
import { IncomingMessage } from "http";
import { MysqlStatusRepository } from "./mysqlStatusRepository";

export const dataRouter = express.Router();

const wss = new WebSocket.Server({ noServer: true });

const statusRepository = new MysqlStatusRepository();

wss.on("connection", (ws) => {
  console.log("New WebSocket connection established.");

  ws.on("message", async (message: Buffer) => {
    const messageString = message.toString();
    console.log("Received message:", messageString);

    try {
      const data = JSON.parse(messageString);
      const status = await statusRepository.getStatus();

      if (status) {
        const req = {
          body: data,
        } as express.Request;

        const res = {
          status: (code: number) => ({
            json: (data: any) => {},
          }),
        } as express.Response;

        await addDataController.run(req, res);
      } else {
        console.log("Data received but not processed due to status being false.");
      }
    } catch (error) {
      console.error("Error processing WebSocket message:", error);
    }
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed.");
  });
});

dataRouter.post("/add", authMiddleware, (req, res) => {
  addDataController.run(req, res);
});

dataRouter.post("/status", authMiddleware, (req, res) => {
  statusController.updateStatus(req, res);
});

dataRouter.get("/status", authMiddleware, (req, res) => {
  statusController.getStatus(req, res);
});

dataRouter.get("/data", authMiddleware, (req, res) => { // Nueva ruta
  getDataController.run(req, res);
});

export const setupWebSocket = (server: any) => {
  server.on("upgrade", (request: IncomingMessage, socket: any, head: any) => {
    if (request.url === "/ws") {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
      });
    } else {
      socket.destroy();
    }
  });
};
