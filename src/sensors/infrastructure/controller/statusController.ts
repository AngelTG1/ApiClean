import { Request, Response } from "express";
import { StatusRepository } from "../../domain/statusRepository";

export class StatusController {
  constructor(private statusRepository: StatusRepository) {}

  async updateStatus(req: Request, res: Response): Promise<void> {
    try {
      const { status } = req.body;
      await this.statusRepository.updateStatus(status);
      res.status(200).json({
        status: "success",
        message: `Status updated to ${status}`
      });
    } catch (error) {
      console.error("Error in Controller", error);
      res.status(500).json({
        status: "error",
        message: "Server Error"
      });
    }
  }

  async getStatus(req: Request, res: Response): Promise<void> {
    try {
      const status = await this.statusRepository.getStatus();
      res.status(200).json({
        status: "success",
        data: { status },
        message: "Status fetched successfully"
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
