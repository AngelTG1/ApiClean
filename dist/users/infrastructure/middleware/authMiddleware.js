"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const JwtService_1 = require("../helpers/JwtService");
const jwtService = new JwtService_1.JwtService();
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ status: "error", message: "Access Denied. No Token Provided." });
    }
    try {
        const decoded = jwtService.verifyToken(token);
        if (!decoded) {
            return res.status(400).json({ status: "error", message: "Invalid Token" });
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(400).json({ status: "error", message: "Invalid Token" });
    }
};
exports.authMiddleware = authMiddleware;
