import { Request, Response, NextFunction } from "express";
import { JwtService } from "../helpers/JwtService";

const jwtService = new JwtService();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ status: "error", message: "Access Denied. No Token Provided." });
  }

  try {
    const decoded = jwtService.verifyToken(token);
    if (!decoded) {
      return res.status(400).json({ status: "error", message: "Invalid Token" });
    }
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ status: "error", message: "Invalid Token" });
  }
};
