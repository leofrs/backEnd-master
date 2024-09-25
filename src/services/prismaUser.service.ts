import { PrismaClient } from "@prisma/client";
import { CreateUser } from "../../@types/user";

const prismaUser = new PrismaClient();

export class UserPrisma {
    async create_user({ name, email, password }: CreateUser) {
        try {
            const newUser = await prismaUser.user.create({
                data: {
                    name,
                    email,
                    password,
                },
            });
            return newUser;
        } catch (error) {
            console.error("Erro ao criar o usuário:", error);
            throw new Error("Não foi possível criar o usuário");
        } finally {
            await prismaUser.$disconnect();
        }
    }
}
