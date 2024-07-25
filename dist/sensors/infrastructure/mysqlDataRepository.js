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
exports.MysqlDataRepository = void 0;
const data_1 = require("../domain/data");
const mysql_1 = require("../../database/mysql");
class MysqlDataRepository {
    addData(temperature, heart_rate, spo2) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO data (temperature, heart_rate, spo2) VALUES (?, ?, ?)";
            const params = [temperature, heart_rate, spo2];
            try {
                const result = yield (0, mysql_1.query)(sql, params);
                if (result) {
                    const dataId = result.insertId;
                    return new data_1.Data(dataId, temperature, heart_rate, spo2);
                }
                return null;
            }
            catch (error) {
                console.error("Error in addData:", error);
                return null;
            }
        });
    }
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM data";
            try {
                const result = yield (0, mysql_1.query)(sql, []);
                return result.map(row => new data_1.Data(row.id, row.temperature, row.heart_rate, row.spo2));
            }
            catch (error) {
                console.error("Error in getData:", error);
                return [];
            }
        });
    }
}
exports.MysqlDataRepository = MysqlDataRepository;
