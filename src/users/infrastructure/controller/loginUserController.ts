import { Request, Response } from "express";
import { LoginUserUseCase } from "../../application/loginUserUseCase";

export class LoginUserController {
  constructor(private loginUserUseCase: LoginUserUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await this.loginUserUseCase.run(email, password);

      if (token) {
        res.status(200).json({
          status: "success",
          data: {
            token
          },
          message: "Login Successful"
        });
      } else {
        res.status(400).json({
          status: "error",
          data: [],
          message: "Invalid Credentials"
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
