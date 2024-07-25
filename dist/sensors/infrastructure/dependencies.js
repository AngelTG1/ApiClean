"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusController = exports.getDataController = exports.addDataController = void 0;
const mysqlDataRepository_1 = require("./mysqlDataRepository");
const mysqlStatusRepository_1 = require("./mysqlStatusRepository");
const addDataUseCase_1 = require("../application/addDataUseCase");
const getDataUseCase_1 = require("../application/getDataUseCase"); //
const addDataController_1 = require("./controller/addDataController");
const getDataController_1 = require("./controller/getDataController");
// import { ConsumeDataController } from "./controller/consumeDataController";
const statusController_1 = require("./controller/statusController");
// Repositorios
const mysqlDataRepository = new mysqlDataRepository_1.MysqlDataRepository();
const mysqlStatusRepository = new mysqlStatusRepository_1.MysqlStatusRepository();
// Casos de Uso
const addDataUseCase = new addDataUseCase_1.AddDataUseCase(mysqlDataRepository);
const getDataUseCase = new getDataUseCase_1.GetDataUseCase(mysqlDataRepository);
// Controladores
exports.addDataController = new addDataController_1.AddDataController(addDataUseCase);
exports.getDataController = new getDataController_1.GetDataController(getDataUseCase);
exports.statusController = new statusController_1.StatusController(mysqlStatusRepository);
