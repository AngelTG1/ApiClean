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
exports.AddDataController = void 0;
class AddDataController {
    constructor(addDataUseCase) {
        this.addDataUseCase = addDataUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { temperature, heart_rate, spo2 } = req.body;
                const newData = yield this.addDataUseCase.run(temperature, heart_rate, spo2);
                if (newData) {
                    res.status(201).json({
                        status: "success",
                        data: {
                            id: newData.id,
                            temperature: newData.temperature,
                            heart_rate: newData.heart_rate,
                            spo2: newData.spo2
                        },
                        message: "Data Created"
                    });
                }
                else {
                    res.status(400).json({
                        status: "error",
                        data: [],
                        message: "Error Creating Data"
                    });
                }
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
exports.AddDataController = AddDataController;
