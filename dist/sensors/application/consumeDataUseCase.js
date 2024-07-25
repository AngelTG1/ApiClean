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
exports.ConsumeDataUseCase = void 0;
class ConsumeDataUseCase {
    constructor(dataRepository, statusRepository) {
        this.dataRepository = dataRepository;
        this.statusRepository = statusRepository;
    }
    run(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.statusRepository.getStatus();
            if (status) {
                // Consumir solo si el estado es verdadero
                for (let i = 0; i < Math.min(10, data.length); i++) {
                    const item = data[i];
                    yield this.dataRepository.addData(item.temperature, item.heart_rate, item.spo2);
                }
            }
        });
    }
}
exports.ConsumeDataUseCase = ConsumeDataUseCase;
