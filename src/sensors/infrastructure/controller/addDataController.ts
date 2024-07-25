import { Request, Response } from "express";
import { AddDataUseCase } from "../../application/addDataUseCase";

export class AddDataController {
  constructor(private addDataUseCase: AddDataUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const { temperature, heart_rate, spo2 } = req.body;
      const newData = await this.addDataUseCase.run(temperature, heart_rate, spo2);

      if (newData) {
        res.status(201).json({
          status: "success",
          data: {
            id: newData.id,
            temperature: newData.temperature,
            heart_rate: newData.heart_rate,
            spo2: newData.spo2
          },
          message: "Data Created"
        });
      } else {
        res.status(400).json({
          status: "error",
          data: [],
          message: "Error Creating Data"
        });
      }
    } catch (error) {
      console.error("Error in Controller", error);
      res.status(500).json({
        status: "error",
        message: "Server Error"
      });
    }
  }
}
