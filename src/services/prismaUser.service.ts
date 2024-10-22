import { PrismaClient } from "@prisma/client";
import { CreateUser } from "../../@types/user";

const prismaUser = new PrismaClient();

export class UserPrisma {
  async createUser({ name, email, password, confirmPassword }: CreateUser) {
    try {
      const newUser = await prismaUser.user.create({
        data: {
          name,
          email,
          password,
          confirmPassword,
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

  async findByEmail(email: string) {
    try {
      const findUser = await prismaUser.user.findUnique({
        where: {
          email,
        },
      });
      return findUser;
    } catch (error) {
      console.error("Erro ao encontrar o usuário:", error);
      throw new Error("Não foi possível encontrar o usuário");
    } finally {
      await prismaUser.$disconnect();
    }
  }
}
