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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupWebSocket = exports.dataRouter = void 0;
const express_1 = __importDefault(require("express"));
const ws_1 = __importDefault(require("ws"));
const dependencies_1 = require("./dependencies"); // Importa getDataController
const authMiddleware_1 = require("../../users/infrastructure/middleware/authMiddleware");
const mysqlStatusRepository_1 = require("./mysqlStatusRepository");
exports.dataRouter = express_1.default.Router();
const wss = new ws_1.default.Server({ noServer: true });
const statusRepository = new mysqlStatusRepository_1.MysqlStatusRepository();
wss.on("connection", (ws) => {
    console.log("New WebSocket connection established.");
    ws.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
        const messageString = message.toString();
        console.log("Received message:", messageString);
        try {
            const data = JSON.parse(messageString);
            const status = yield statusRepository.getStatus();
            if (status) {
                const req = {
                    body: data,
                };
                const res = {
                    status: (code) => ({
                        json: (data) => { },
                    }),
                };
                yield dependencies_1.addDataController.run(req, res);
            }
            else {
                console.log("Data received but not processed due to status being false.");
            }
        }
        catch (error) {
            console.error("Error processing WebSocket message:", error);
        }
    }));
    ws.on("close", () => {
        console.log("WebSocket connection closed.");
    });
});
exports.dataRouter.post("/add", authMiddleware_1.authMiddleware, (req, res) => {
    dependencies_1.addDataController.run(req, res);
});
exports.dataRouter.post("/status", authMiddleware_1.authMiddleware, (req, res) => {
    dependencies_1.statusController.updateStatus(req, res);
});
exports.dataRouter.get("/status", authMiddleware_1.authMiddleware, (req, res) => {
    dependencies_1.statusController.getStatus(req, res);
});
exports.dataRouter.get("/data", authMiddleware_1.authMiddleware, (req, res) => {
    dependencies_1.getDataController.run(req, res);
});
const setupWebSocket = (server) => {
    server.on("upgrade", (request, socket, head) => {
        if (request.url === "/ws") {
            wss.handleUpgrade(request, socket, head, (ws) => {
                wss.emit("connection", ws, request);
            });
        }
        else {
            socket.destroy();
        }
    });
};
exports.setupWebSocket = setupWebSocket;
