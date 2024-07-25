import { Data } from "./data";

export interface DataRepository {
  addData(temperature: string, heart_rate: string, spo2: string): Promise<Data | null>;
  getData(): Promise<Data[]>;
}
