import { Request, Response } from "express";
import { GetDataUseCase } from "../../application/getDataUseCase";

export class GetDataController {
  constructor(private getDataUseCase: GetDataUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.getDataUseCase.run();
      res.status(200).json({
        status: "success",
        data,
        message: "Data fetched successfully"
      });
    } catch (error) {
      console.error("Error in GetDataController:", error);
      res.status(500).json({
        status: "error",
        message: "Server Error"
      });
    }
  }
}
