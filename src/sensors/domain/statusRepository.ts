import { Data } from "./data";

export interface StatusRepository {
    getStatus(): Promise<boolean>;
    updateStatus(newStatus: boolean): Promise<void>;
  }
  