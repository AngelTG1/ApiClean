import { Sender } from "./Sender";

export interface SenderRepository {
    send(message: string): Promise< Sender | void>;
  }
  