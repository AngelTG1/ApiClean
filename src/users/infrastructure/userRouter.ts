import express from "express";
import { registerUserController, loginUserController } from "./dependencies";
import { authMiddleware } from "./middleware/authMiddleware";

/// <reference path="../express.d.ts" />

export const userRouter = express.Router();

userRouter.post("/register", registerUserController.run.bind(registerUserController));
userRouter.post("/login", loginUserController.run.bind(loginUserController));

// Rutas protegidas
userRouter.get("/protected", authMiddleware, (req, res) => {
  if (req.user) {
    const {  name } = req.user;
    res.status(200).json({
      status: "success",
      message: `You have accessed a protected route, Welcome ${name}`
    });
  } else {
    res.status(400).json({
      status: "error",
      message: "User information not available"
    });
  }
});
