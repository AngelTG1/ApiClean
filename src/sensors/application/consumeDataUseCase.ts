import { DataRepository } from "../domain/dataRepository";
import { StatusRepository } from "../domain/statusRepository"

export class ConsumeDataUseCase {
  constructor(
    private readonly dataRepository: DataRepository,
    private readonly statusRepository: StatusRepository
  ) {}

  async run(data: any[]): Promise<void> {
    const status = await this.statusRepository.getStatus();
    if (status) {
      // Consumir solo si el estado es verdadero
      for (let i = 0; i < Math.min(10, data.length); i++) {
        const item = data[i];
        await this.dataRepository.addData(item.temperature, item.heart_rate, item.spo2);
      }
    }
  }
}
