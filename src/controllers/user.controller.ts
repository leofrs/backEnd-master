import { Request, Response } from "express";
import { CreateUser, LoginUser } from "../../@types/user";
import { UserPrisma } from "../services/prismaUser.service";
import { comparePassword, hashPassword } from "../services/bcrypt.service";

const userPrisma = new UserPrisma();

export class UserController {
    async register(req: Request, res: Response) {
        const { name, email, password } = req.body as CreateUser;

        if (!name || !email || !password) {
            return res.status(400).json({
                error: "Nome, email e senha são obrigatórios.",
            });
        }

        const existingUser = await userPrisma.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({
                error: "Usuário já cadastrado com esse email.",
            });
        }

        const cryptPassword = await hashPassword(password);

        try {
            const newUser = await userPrisma.createUser({
                name,
                email,
                password: cryptPassword,
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
            return res.status(501).json({
                error: "Erro interno detectado.",
                details: error || "Erro desconhecido.",
            });
        }
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body as LoginUser;
        if (!email || !password) {
            return res.status(400).json({
                error: "Email e senha não passados.",
            });
        }

        try {
            const user = await userPrisma.findByEmail(email);
            if (!user) {
                return res.status(401).json({
                    error: "Usuário não cadastrado/encontrado",
                });
            }

            const isPasswordValid = await comparePassword(
                password,
                user.password
            );
            if (!isPasswordValid) {
                return res.status(409).json({
                    error: "Senha inválida.",
                });
            }
            return res.status(200).json({
                message: "Login realizado com sucesso.",
            });
        } catch (error) {
            console.error("Erro interno:", error);
            return res.status(500).json({
                error: "Erro interno detectado.",
                details: error || "Erro desconhecido.",
            });
        }
    }
}
