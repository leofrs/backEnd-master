import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { LoginUser } from "../../@types/user";
import { AuthenticatedRequest } from "../../@types/authUser";

export const secretKey = "159";

export const jwtMiddleware = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Acesso negado." });
    }

    try {
        const verified = jwt.verify(token, secretKey) as LoginUser;
        req.user = verified;
        next();
    } catch (error) {
        return res.status(400).json({ message: "Token inválido." });
    }
};
