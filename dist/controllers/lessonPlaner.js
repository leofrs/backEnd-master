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
exports.LessonPlaner = void 0;
const openAi_1 = require("../utils/openAi");
const zod_1 = require("zod");
const zod_2 = require("openai/helpers/zod");
const client_1 = require("@prisma/client");
const prismaUser_service_1 = require("../services/prismaUser.service");
const userPrisma = new prismaUser_service_1.UserPrisma();
const prisma = new client_1.PrismaClient();
const lessonPlanSchema = zod_1.z.object({
    topic: zod_1.z.string(),
    subtopic: zod_1.z.string(),
    duration: zod_1.z.number(),
    studentLevel: zod_1.z.string(),
    objective: zod_1.z.string(),
    sections: zod_1.z.array(zod_1.z.object({
        title: zod_1.z.string(),
        content: zod_1.z.string(),
        duration: zod_1.z.number(),
    })),
});
class LessonPlaner {
    createLessonPlan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { topic, subtopic, duration, studentLevel, objective, email } = req.body;
                if (!topic &&
                    !subtopic &&
                    !duration &&
                    !studentLevel &&
                    !objective &&
                    !email) {
                    res.status(301).json({
                        success: "Error",
                        message: "Não foram passados o topico, subtopico, duração, nivel do estudante, objetivo e email",
                    });
                    return;
                }
                const user = yield userPrisma.findByEmail(email);
                if (!user || !user.id) {
                    res.status(401).json({
                        success: "false",
                        message: "Usúario não autorizado",
                    });
                    return;
                }
                const responseOpenAi = yield openAi_1.openAiClient.beta.chat.completions.parse({
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content: "You are a helpful assistant that generates lesson plans for teachers and students.",
                        },
                        {
                            role: "user",
                            content: `Generate a lesson plan for ${topic} with the subtopic of ${subtopic} with a duration of ${duration} minutes for ${studentLevel} students with the objective of ${objective}. The sections of the lesson plan should have a duration but the sum of all section durations should not exceed ${duration} minutes`,
                        },
                    ],
                    response_format: (0, zod_2.zodResponseFormat)(lessonPlanSchema, "lessonPlan"),
                });
                const lessonPlan = responseOpenAi.choices[0].message.parsed;
                if (!lessonPlan) {
                    throw new Error("Nenhum plano foi gerado");
                }
                const lessonPlanDb = yield prisma.lessonPlan.create({
                    data: Object.assign(Object.assign({}, lessonPlan), { userId: user.id, title: lessonPlan.topic, subject: lessonPlan.subtopic, duration: lessonPlan.duration, sections: {
                            create: lessonPlan.sections.map((section) => (Object.assign(Object.assign({}, section), { duration: section.duration }))),
                        } }),
                });
                if (lessonPlanDb) {
                    res
                        .status(201)
                        .json({ success: "true", message: "Plano gerado com sucesso" });
                }
            }
            catch (error) {
                res.status(500).json({
                    success: "Error",
                    message: `Não foi possível criar o planer: ${error}`,
                });
            }
        });
    }
}
exports.LessonPlaner = LessonPlaner;
