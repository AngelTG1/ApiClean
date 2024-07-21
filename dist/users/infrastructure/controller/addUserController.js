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
exports.AddUserController = void 0;
class AddUserController {
    constructor(addUserUsecase) {
        this.addUserUsecase = addUserUsecase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, last_name } = req.body;
                const createdUser = yield this.addUserUsecase.run(name, last_name);
                if (createdUser) {
                    res.status(201).json({
                        status: "success",
                        data: {
                            name: createdUser.name,
                            last_name: createdUser.last_name
                        },
                        message: "User Created"
                    });
                }
                else {
                    res.status(400).json({
                        status: "error",
                        data: [],
                        message: "Error Creating User"
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
exports.AddUserController = AddUserController;
