import { Request, Response } from "express";
import { RegisterUserUseCase } from "../../application/registerUserUseCase";

export class RegisterUserController {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;
      const createdUser = await this.registerUserUseCase.run(name, email, password);

      if (createdUser) {
        res.status(201).json({
          status: "success",
          data: {
            name: createdUser.name,
            email: createdUser.email,
            password: createdUser.password
          },
          message: "User Registered"
        });
      } else {
        res.status(400).json({
          status: "error",
          data: [],
          message: "Error Registering User"
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
