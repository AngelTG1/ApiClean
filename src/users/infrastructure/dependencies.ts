import { MysqlUserRepository } from "./mysqlUserRepository";
import { RegisterUserUseCase } from "../application/registerUserUseCase";
import { LoginUserUseCase } from "../application/loginUserUseCase";
import { RegisterUserController } from "./controller/registerUserController"; 
import { LoginUserController } from "./controller/loginUserController";
import { JwtService } from "./helpers/JwtService";
import { EncryptService } from "./helpers/EncryptService";

const mysqlUserRepository = new MysqlUserRepository();
const jwtService = new JwtService();
const encryptService = new EncryptService();
const registerUserUseCase = new RegisterUserUseCase(mysqlUserRepository, encryptService);
const loginUserUseCase = new LoginUserUseCase(mysqlUserRepository, jwtService, encryptService);

export const registerUserController = new RegisterUserController(registerUserUseCase);
export const loginUserController = new LoginUserController(loginUserUseCase);
