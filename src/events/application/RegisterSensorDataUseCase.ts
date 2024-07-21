// src/application/RegisterSensorDataUseCase.ts
import { Sender } from '../domain/Sender';
import { SenderRepository } from '../domain/sensorRepository'

export class RegisterSensorDataUseCase {
    constructor(
        private sensorRepository: SenderRepository, // Para almacenar los datos en la base de datos
        private sender: Sender // Para enviar los datos a RabbitMQ
    ) {}

    async execute(sensorName: string, data: any): Promise<void> {
        // Primero, guarda los datos en la base de datos
        await this.sensorRepository.send(sensorName);

        // Luego, envía los datos a RabbitMQ
        await this.sender.send(JSON.stringify({ sensorName, data }));
    }
}
