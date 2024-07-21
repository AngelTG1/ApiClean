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
exports.AdduserController = void 0;
class AdduserController {
    constructor(addUserUsecase) {
        this.addUserUsecase = addUserUsecase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { name, last_name } = req.body; // cambia
                let createduser = yield this.addUserUsecase.run(name, last_name);
                if (createduser) {
                    return res.status(200).send({
                        status: "success",
                        data: {
                            name: createduser.name,
                            last_name: createduser.last_name
                        },
                        message: "User Creado"
                    });
                }
                else {
                    return res.status(400).send({
                        status: "Error",
                        data: [],
                        Message: "Error Al Crear User"
                    });
                }
            }
            catch (error) {
                console.error("Error In Controller", error);
                res.status(500).send({
                    status: "error",
                    Message: "Error In Server"
                });
            }
        });
    }
}
exports.AdduserController = AdduserController;
