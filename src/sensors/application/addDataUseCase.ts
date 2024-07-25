import { Data } from "../domain/data";
import { DataRepository } from "../domain/dataRepository";

export class AddDataUseCase {
  constructor(private readonly dataRepository: DataRepository) {}

  async run(temperature: string, heart_rate: string, spo2: string): Promise<Data | null> {
    try {
      const newData = await this.dataRepository.addData(temperature, heart_rate, spo2);
      return newData;
    } catch (error) {
      console.error('Error in AddDataUseCase', error);
      return null;
    }
  }
}
