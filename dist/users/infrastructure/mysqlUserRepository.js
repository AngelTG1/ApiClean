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
const mysql_1 = require("../../database/mysql"); // Asegúrate de que la ruta es correcta
class MysqlUserRepository {
    addUser(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
            const params = [name, email, password];
            try {
                const result = yield (0, mysql_1.query)(sql, params);
                if (result) {
                    const userId = result.insertId;
                    return new user_1.User(userId, name, email, password);
                }
                return null;
            }
            catch (error) {
                console.error("Error in addUser:", error);
                return null;
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM users WHERE email = ?";
            const params = [email];
            try {
                const result = yield (0, mysql_1.query)(sql, params);
                if (result.length > 0) {
                    const { id, name, email, password } = result[0];
                    return new user_1.User(id, name, email, password);
                }
                return null;
            }
            catch (error) {
                console.error("Error in findByEmail:", error);
                return null;
            }
        });
    }
}
exports.MysqlUserRepository = MysqlUserRepository;
