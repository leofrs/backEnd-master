import { Router } from "express";
import { UserController } from "../controllers/user.controller";

export const userRouter = Router();
const userController = new UserController();

/**
 * @swagger
 * /api/v1/create-user:
 *   post:
 *     summary: Cria um usuário
 *     description: Cria um usuário no banco de dados
 *     responses:
 *       201:
 *         description: Sucesso! Usuário criada com sucesso.
 *       500:
 *         description: Erro ao criar o usuário.
 */
userRouter.post("/api/v1/create-user", userController.create);
