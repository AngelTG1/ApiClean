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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlUserRepository = void 0;
const user_1 = require("../domain/user");
const mysql_1 = require("../../database/mysql");
class MysqlUserRepository {
    addUser(name, last_name) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO users (name, last_name) VALUES (?, ?)";
            const params = [name, last_name];
            try {
                // Ejecutar la consulta SQL y obtener el ID del usuario insertado
                const result = yield (0, mysql_1.query)(sql, params);
                if (result) {
                    const userId = result.insertId; // Obtener el ID del resultado
                    return new user_1.User(userId, name, last_name);
                }
                return null;
            }
            catch (error) {
                console.error("Error in addUser:", error);
                return null;
            }
        });
    }
}
exports.MysqlUserRepository = MysqlUserRepository;
