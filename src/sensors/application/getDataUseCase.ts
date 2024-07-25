import { DataRepository } from "../domain/dataRepository";
import { Data } from "../domain/data";

export class GetDataUseCase {
  constructor(private dataRepository: DataRepository) {}

  async run(): Promise<Data[]> {
    return await this.dataRepository.getData();
  }
}
