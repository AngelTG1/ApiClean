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
exports.AddDataUseCase = void 0;
class AddDataUseCase {
    constructor(dataRepository) {
        this.dataRepository = dataRepository;
    }
    run(temperature, heart_rate, spo2) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newData = yield this.dataRepository.addData(temperature, heart_rate, spo2);
                return newData;
            }
            catch (error) {
                console.error('Error in AddDataUseCase', error);
                return null;
            }
        });
    }
}
exports.AddDataUseCase = AddDataUseCase;
