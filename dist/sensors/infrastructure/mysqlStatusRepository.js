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
exports.MysqlStatusRepository = void 0;
const mysql_1 = require("../../database/mysql");
class MysqlStatusRepository {
    getStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT status FROM status ORDER BY id DESC LIMIT 1";
            const result = yield (0, mysql_1.query)(sql, []);
            if (result.length === 0) {
                // Si no hay resultados, inicializa el estado
                yield this.initializeStatus();
                return false;
            }
            return result[0].status;
        });
    }
    updateStatus(newStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            // Usar una subconsulta dentro de una tabla derivada para evitar el problema
            const sql = `
      UPDATE status, (SELECT id FROM status ORDER BY id DESC LIMIT 1) AS subquery
      SET status.status = ?
      WHERE status.id = subquery.id
    `;
            const result = yield (0, mysql_1.query)(sql, [newStatus]);
            if (result.affectedRows === 0) {
                // Si no se ha actualizado, intenta inicializar el estado y actualizar de nuevo
                yield this.initializeStatus();
                yield (0, mysql_1.query)(sql, [newStatus]);
            }
        });
    }
    initializeStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO status (status) VALUES (FALSE)";
            yield (0, mysql_1.query)(sql, []);
        });
    }
}
exports.MysqlStatusRepository = MysqlStatusRepository;
