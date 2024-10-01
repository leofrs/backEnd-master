import { Request, Response } from "express";
import { TaskPrisma } from "../services/prismaTask.service";
import { CreateTask } from "../../@types/task";
const taskPrisma = new TaskPrisma();

export class TaskController {
    async create(req: Request, res: Response) {
        const { title, description, date } = req.body as CreateTask;

        if (!title && !date) {
            return res.status(400).json({
                error: "Título e data são obrigatórios.",
            });
        }

        try {
            const newTask = await taskPrisma.createTask({
                title,
                description,
                aFazer: true,
                fazendo: false,
                feito: false,
                date,
            });

            if (newTask) {
                return res.status(201).json({
                    message: "Tarefa criada com sucesso",
                });
            } else {
                return res.status(500).json({
                    error: "Erro ao criar a tarefa.",
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
}
