import { Request, Response } from "express";
import { AddUserUseCase } from "../../application/addUserUseCase";

export class AddUserController {
    constructor(private addUserUsecase: AddUserUseCase) {}

    async run(req: Request, res: Response): Promise<void> {
        try {
            const { name, last_name } = req.body;

            const createdUser = await this.addUserUsecase.run(name, last_name);

            if (createdUser) {
                res.status(201).json({
                    status: "success",
                    data: {
                        name: createdUser.name,
                        last_name: createdUser.last_name
                    },
                    message: "User Created"
                });
            } else {
                res.status(400).json({
                    status: "error",
                    data: [],
                    message: "Error Creating User"
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
