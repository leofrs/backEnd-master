import { Request, Response } from "express";
import { CreateUser } from "../../@types/user";
import { UserPrisma } from "../services/prismaUser.service";

const userPrisma = new UserPrisma();

export class UserController {
    async create(req: Request, res: Response) {
        const { name, email, password } = req.body as CreateUser;

        if (!name || !email || !password) {
            return res.status(400).json({
                error: "Nome, email e senha são obrigatórios.",
            });
        }

        try {
            const newUser = await userPrisma.create_user({
                name,
                email,
                password,
            });

            if (newUser) {
                return res.status(201).json({
                    message: "Usuário criado com sucesso",
                });
            } else {
                return res.status(500).json({
                    error: "Erro ao criar o usuário.",
                });
            }
        } catch (error) {
            console.error("Erro interno:", error);
            return res.status(500).json({
                error: "Erro interno detectado.",
                details: error || "Erro desconhecido.",
            });
        }
    }
}
