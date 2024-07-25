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
exports.RegisterUserController = void 0;
class RegisterUserController {
    constructor(registerUserUseCase) {
        this.registerUserUseCase = registerUserUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const createdUser = yield this.registerUserUseCase.run(name, email, password);
                if (createdUser) {
                    res.status(201).json({
                        status: "success",
                        data: {
                            name: createdUser.name,
                            email: createdUser.email,
                            password: createdUser.password
                        },
                        message: "User Registered"
                    });
                }
                else {
                    res.status(400).json({
                        status: "error",
                        data: [],
                        message: "Error Registering User"
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
exports.RegisterUserController = RegisterUserController;
