"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUserController = exports.addUserUseCase = exports.mysqlUserRepository = void 0;
const mysqlUserRepository_1 = require("./mysqlUserRepository");
const addUserUseCase_1 = require("../application/addUserUseCase");
const addUserController_1 = require("./controller/addUserController");
exports.mysqlUserRepository = new mysqlUserRepository_1.MysqlUserRepository();
exports.addUserUseCase = new addUserUseCase_1.AddUserUseCase(exports.mysqlUserRepository);
exports.addUserController = new addUserController_1.AdduserController(exports.addUserUseCase);
