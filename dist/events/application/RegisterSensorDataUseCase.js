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
exports.RegisterSensorDataUseCase = void 0;
class RegisterSensorDataUseCase {
    constructor(sensorRepository, // Para almacenar los datos en la base de datos
    sender // Para enviar los datos a RabbitMQ
    ) {
        this.sensorRepository = sensorRepository;
        this.sender = sender;
    }
    execute(sensorName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Primero, guarda los datos en la base de datos
            yield this.sensorRepository.send(sensorName);
            // Luego, envía los datos a RabbitMQ
            yield this.sender.send(JSON.stringify({ sensorName, data }));
        });
    }
}
exports.RegisterSensorDataUseCase = RegisterSensorDataUseCase;
