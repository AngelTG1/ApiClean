import { Request, Response } from "express";
import { ConsumeDataUseCase } from "../../application/consumeDataUseCase";

export class ConsumeDataController {
  constructor(private consumeDataUseCase: ConsumeDataUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body.data;
      await this.consumeDataUseCase.run(data);
      res.status(200).json({
        status: "success",
        message: "Data consumed"
      });
    } catch (error) {
      console.error("Error in Controller", error);
      res.status(500).json({
        status: "error",
        message: "Server Error"
      });
    }
  }
}
