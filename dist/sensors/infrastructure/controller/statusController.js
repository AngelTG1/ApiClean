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
exports.StatusController = void 0;
class StatusController {
    constructor(statusRepository) {
        this.statusRepository = statusRepository;
    }
    updateStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status } = req.body;
                yield this.statusRepository.updateStatus(status);
                res.status(200).json({
                    status: "success",
                    message: `Status updated to ${status}`
                });
            }
            catch (error) {
                console.error("Error in Controller", error);
                res.status(500).json({
                    status: "error",
                    message: "Server Error"
                });
            }
        });
    }
    getStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const status = yield this.statusRepository.getStatus();
                res.status(200).json({
                    status: "success",
                    data: { status },
                    message: "Status fetched successfully"
                });
            }
            catch (error) {
                console.error("Error in Controller", error);
                res.status(500).json({
                    status: "error",
                    message: "Server Error"
                });
            }
        });
    }
}
exports.StatusController = StatusController;
