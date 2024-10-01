"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtMiddleware = exports.secretKey = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.secretKey = process.env.SECRET_KEY;
const jwtMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Acesso negado." });
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, exports.secretKey);
        req.user = verified;
        next();
    }
    catch (error) {
        return res.status(400).json({ message: "Token inválido." });
    }
};
exports.jwtMiddleware = jwtMiddleware;
