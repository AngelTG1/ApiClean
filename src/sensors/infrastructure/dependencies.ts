import { MysqlDataRepository } from "./mysqlDataRepository";
import { MysqlStatusRepository } from "./mysqlStatusRepository";
import { AddDataUseCase } from "../application/addDataUseCase";
import { GetDataUseCase } from "../application/getDataUseCase"; //
import { ConsumeDataUseCase } from "../application/consumeDataUseCase";
import { AddDataController } from "./controller/addDataController";
import { GetDataController } from "./controller/getDataController"; 
// import { ConsumeDataController } from "./controller/consumeDataController";
import { StatusController } from "./controller/statusController";

// Repositorios
const mysqlDataRepository = new MysqlDataRepository();
const mysqlStatusRepository = new MysqlStatusRepository();

// Casos de Uso
const addDataUseCase = new AddDataUseCase(mysqlDataRepository);
const getDataUseCase = new GetDataUseCase(mysqlDataRepository);


// Controladores
export const addDataController = new AddDataController(addDataUseCase);
export const getDataController = new GetDataController(getDataUseCase); 
export const statusController = new StatusController(mysqlStatusRepository);
