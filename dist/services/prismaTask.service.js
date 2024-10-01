"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskPrisma = void 0;
const client_1 = require("@prisma/client");
const prismaTask = new client_1.PrismaClient();
class TaskPrisma {
    createTask(_a) {
        return __awaiter(this, arguments, void 0, function* ({ title, description, aFazer, fazendo, feito, date, }) {
            try {
                const newTask = yield prismaTask.task.create({
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
            }
            catch (error) {
                console.error("Erro ao criar a tarefa:", error);
                throw new Error("Não foi possível criar a tarefa");
            }
            finally {
                yield prismaTask.$disconnect();
            }
        });
    }
    getTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const get = yield prismaTask.task.findMany();
                return get;
            }
            catch (error) {
                console.error("Erro ao buscar as tarefas:", error);
                throw new Error("Não foi possível buscar as tarefas");
            }
            finally {
                yield prismaTask.$disconnect();
            }
        });
    }
}
exports.TaskPrisma = TaskPrisma;
