import { Router } from "express";
import { LessonPlaner } from "../controllers/lessonPlaner";

export const lessonPlanerRouter = Router();
const lessonPlaner = new LessonPlaner();

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
lessonPlanerRouter.post(
  "/api/v1/create-lesson-planer",
  lessonPlaner.createLessonPlan
);
