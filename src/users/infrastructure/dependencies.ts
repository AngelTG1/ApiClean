import { MysqlUserRepository } from "./mysqlUserRepository";

import { AddUserUseCase } from "../application/addUserUseCase";
import { AddUserController } from "./controller/addUserController"; 

export const mysqlUserRepository = new MysqlUserRepository();

export const addUserUseCase = new AddUserUseCase(mysqlUserRepository);

export const addUserController = new AddUserController(addUserUseCase);