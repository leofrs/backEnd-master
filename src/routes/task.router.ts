import { Router } from "express";
import { TaskController } from "../controllers/task.controller";

export const taskRouter = Router();
const taskController = new TaskController();

/**
 * @swagger
 * /api/v1/get-tasks-by-user:
 *   get:
 *     summary: Encontra as tarefas
 *     description: Faz a busca de todas as tarefas abertas
 *     responses:
 *       201:
 *         description: Sucesso! Tarefa(s) encontrada(s).
 *       500:
 *         description: Erro ao buscar a(s) tarefa(s).
 */
taskRouter.get("/api/v1/get-tasks-by-user");

/**
 * @swagger
 * /api/v1/create-task:
 *   post:
 *     summary: Cria uma nova tarefa.
 *     description: Cria uma nova tarefa de acordo com o usuário logado no momento.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - authorId
 *             properties:
 *               title:
 *                 type: string
 *                 description: Titulo da tarefa criada.
 *               description:
 *                 type: string
 *                 description: Descrição da tarefa criada (essa propriedade não é obrigatoria).
 *               authorID:
 *                 type: number
 *                 description: Id do author para associa-lo a tarefa criada
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso.
 *       400:
 *         description: Título e authorId são obrigatórios.
 *       500:
 *         description: Erro ao criar a tarefa.
 *       501:
 *         description: Erro interno detectado.
 */
taskRouter.post("/api/v1/create-task", taskController.create);
