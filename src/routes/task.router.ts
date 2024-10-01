import { Router } from "express";
import { TaskController } from "../controllers/task.controller";

export const taskRouter = Router();
const taskController = new TaskController();

/**
 * @swagger
 * tags:
 *   - name: Tasks
 *     description: Gerenciar Tasks
 */

/**
 * @swagger
 * /api/v1/create-task:
 *   post:
 *     summary: Cria uma nova tarefa.
 *     description: Cria uma nova tarefa de acordo com o usuário logado no momento. Essa rota precisa do JWT para ser acessada
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *         summary: Obter dados protegidos
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
 *                 description: Descrição da tarefa criada (essa propriedade não é obrigatória).
 *               authorId:
 *                 type: number
 *                 description: Id do author para associá-lo à tarefa criada.
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

taskRouter.get("/api/v1/get-tasks", taskController.getTasks);
