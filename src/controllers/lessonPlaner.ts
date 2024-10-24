import { Request, Response } from "express";
import { openAiClient } from "../utils/openAi";

import { z } from "zod";

import { zodResponseFormat } from "openai/helpers/zod";
import { PrismaClient } from "@prisma/client";

import { UserPrisma } from "../services/prismaUser.service";

const userPrisma = new UserPrisma();

const prisma = new PrismaClient();

const lessonPlanSchema = z.object({
  topic: z.string(),
  subtopic: z.string(),
  duration: z.number(),
  studentLevel: z.string(),
  objective: z.string(),
  sections: z.array(
    z.object({
      title: z.string(),
      content: z.string(),
      duration: z.number(),
    })
  ),
});

export class LessonPlaner {
  async createLessonPlan(req: Request, res: Response) {
    try {
      const { topic, subtopic, duration, studentLevel, objective, email } =
        req.body;

      if (
        !topic &&
        !subtopic &&
        !duration &&
        !studentLevel &&
        !objective &&
        !email
      ) {
        res.status(301).json({
          success: "Error",
          message:
            "Não foram passados o topico, subtopico, duração, nivel do estudante, objetivo e email",
        });
        return;
      }

      const user = await userPrisma.findByEmail(email);

      if (!user || !user.id) {
        res.status(401).json({
          success: "false",
          message: "Usúario não autorizado",
        });
        return;
      }

      const responseOpenAi = await openAiClient.beta.chat.completions.parse({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that generates lesson plans for teachers and students.",
          },
          {
            role: "user",
            content: `Generate a lesson plan for ${topic} with the subtopic of ${subtopic} with a duration of ${duration} minutes for ${studentLevel} students with the objective of ${objective}. The sections of the lesson plan should have a duration but the sum of all section durations should not exceed ${duration} minutes`,
          },
        ],
        response_format: zodResponseFormat(lessonPlanSchema, "lessonPlan"),
      });

      const lessonPlan = responseOpenAi.choices[0].message.parsed;

      if (!lessonPlan) {
        throw new Error("Nenhum plano foi gerado");
      }

      const lessonPlanDb = await prisma.lessonPlan.create({
        data: {
          ...lessonPlan,
          userId: user.id,
          title: lessonPlan.topic,
          subject: lessonPlan.subtopic,
          duration: lessonPlan.duration,
          sections: {
            create: lessonPlan.sections.map((section) => ({
              ...section,
              duration: section.duration,
            })),
          },
        },
      });

      if (lessonPlanDb) {
        res
          .status(201)
          .json({ success: "true", message: "Plano gerado com sucesso" });
      }
    } catch (error) {
      res.status(500).json({
        success: "Error",
        message: `Não foi possível criar o planer: ${error}`,
      });
    }
  }
}
