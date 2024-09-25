import { Router } from "express";
import { TaskController } from "../controllers/task.controller";

export const taskRouter = Router();
const taskController = new TaskController();

/**
 * @swagger
 * /api/v1/create-task:
 *   post:
 *     summary: Criar tarefa
 *     description: Cria uma tarefa e atribui ela a um autor através do authorID
 *     responses:
 *       201:
 *         description: Sucesso! Tarefa criada com sucesso.
 *       500:
 *         description: Erro ao criar a tarefa.
 */
taskRouter.post("/api/v1/create-task", taskController.create);
