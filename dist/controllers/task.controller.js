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
exports.TaskController = void 0;
const prismaTask_service_1 = require("../services/prismaTask.service");
const taskPrisma = new prismaTask_service_1.TaskPrisma();
class TaskController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, date } = req.body;
            if (!title && !date) {
                return res.status(400).json({
                    error: "Título e data são obrigatórios.",
                });
            }
            try {
                const newTask = yield taskPrisma.createTask({
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
                }
                else {
                    return res.status(500).json({
                        error: "Erro ao criar a tarefa.",
                    });
                }
            }
            catch (error) {
                console.error("Erro interno:", error);
                return res.status(501).json({
                    error: "Erro interno detectado.",
                    details: error || "Erro desconhecido.",
                });
            }
        });
    }
    getTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield taskPrisma.getTasks();
                if (tasks && tasks.length > 0) {
                    res.status(200).json(tasks);
                }
                else {
                    res.status(200).json([]);
                }
            }
            catch (error) {
                console.error("Erro interno:", error);
                return res.status(501).json({
                    error: "Erro interno detectado.",
                    details: error || "Erro desconhecido.",
                });
            }
        });
    }
    editTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, aFazer, fazendo, feito } = req.body;
            const taskId = req.params.id;
            const taskIdNumber = Number(taskId);
            if (!title || isNaN(taskIdNumber)) {
                return res.status(400).json({
                    error: "Título e Id da tarefa são obrigatórios.",
                });
            }
            try {
                const newtTaskEdit = yield taskPrisma.editTask(taskIdNumber, {
                    title,
                    description,
                    aFazer,
                    fazendo,
                    feito,
                });
                if (newtTaskEdit) {
                    res.status(201).json("Tarefa editada com sucesso");
                }
                else {
                    res.status(301).json("Erro ao editar tarefa!");
                }
            }
            catch (error) {
                console.error("Erro interno:", error);
                return res.status(501).json({
                    error: "Erro interno detectado.",
                    details: error || "Erro desconhecido.",
                });
            }
        });
    }
}
exports.TaskController = TaskController;
