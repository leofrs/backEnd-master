import { PrismaClient } from "@prisma/client";
import { Task, EditTask } from "../../@types/task";

const prismaTask = new PrismaClient();

export class TaskPrisma {
    async createTask({
        title,
        description,
        aFazer,
        fazendo,
        feito,
        date,
    }: Task) {
        try {
            const newTask = await prismaTask.task.create({
                data: {
                    title,
                    description,
                    aFazer,
                    fazendo,
                    feito,
                    date,
                },
            });
            return newTask;
        } catch (error) {
            console.error("Erro ao criar a tarefa:", error);
            throw new Error("Não foi possível criar a tarefa");
        } finally {
            await prismaTask.$disconnect();
        }
    }

    async getTasks() {
        try {
            const get = await prismaTask.task.findMany();
            return get;
        } catch (error) {
            console.error("Erro ao buscar as tarefas:", error);
            throw new Error("Não foi possível buscar as tarefas");
        } finally {
            await prismaTask.$disconnect();
        }
    }

    async editTask(
        id: number,
        { title, description, aFazer, fazendo, feito }: EditTask
    ) {
        try {
            const newTaskEdit = await prismaTask.task.update({
                where: {
                    id,
                },
                data: {
                    title,
                    description,
                    aFazer,
                    fazendo,
                    feito,
                },
            });
            return newTaskEdit;
        } catch (error) {
            console.error("Erro ao editar a tarefa:", error);
            throw new Error("Não foi possível editar a tarefa");
        } finally {
            await prismaTask.$disconnect();
        }
    }
}
