import { Router } from "express";
import { UserController } from "../controllers/user.controller";

export const userRouter = Router();
const userController = new UserController();

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Gerenciar usuários
 */

/**
 * @swagger
 * /api/v1/register-user:
 *    post:
 *     summary: Cria um usuário.
 *     description: Cria uma novo usuário no banco de dados.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do usuário.
 *               email:
 *                 type: string
 *                 description: E-mail do usuário(esse email é unico no banco de dados).
 *               password:
 *                 type: string
 *                 description: Senha que o usuário escolher cadastrar(essa senha é criptografada ao ir para o banco de dados).
 *       201:
 *         description: Sucesso! Usuário criada com sucesso.
 *       400:
 *         description: Nome, email e senha são obrigatórios.
 *       409:
 *         description: Usuário já cadastrado com esse email.
 *       500:
 *         description: Erro ao criar o usuário.
 *       501:
 *         description: Erro interno detectado.
 */
userRouter.post("/api/v1/register", userController.register);

/**
 * @swagger
 * /api/v1/login:
 *    post:
 *     summary: Login do usuário.
 *     description: Vai ao banco de dados e faz a busca pelo email, mais a comparação entre senhas para validar o login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: E-mail do usuário(esse email é unico no banco de dados).
 *               password:
 *                 type: string
 *                 description: Senha que o usuário cadastrou no DB(essa senha está criptografada no banco de dados).
 *       200:
 *         description: Retorna o JWT criado.
 *       400:
 *         description: Email e senha não passados.
 *       401:
 *         description: Usuário não cadastrado/encontrado
 *       409:
 *         description: Senha inválida.
 *       500:
 *         description: Erro interno detectado.
 */
userRouter.post("/api/v1/login", userController.login);
