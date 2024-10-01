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
exports.UserPrisma = void 0;
const client_1 = require("@prisma/client");
const prismaUser = new client_1.PrismaClient();
class UserPrisma {
    createUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, password }) {
            try {
                const newUser = yield prismaUser.user.create({
                    data: {
                        name,
                        email,
                        password,
                    },
                });
                return newUser;
            }
            catch (error) {
                console.error("Erro ao criar o usuário:", error);
                throw new Error("Não foi possível criar o usuário");
            }
            finally {
                yield prismaUser.$disconnect();
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findUser = yield prismaUser.user.findUnique({
                    where: {
                        email,
                    },
                });
                return findUser;
            }
            catch (error) {
                console.error("Erro ao encontrar o usuário:", error);
                throw new Error("Não foi possível encontrar o usuário");
            }
            finally {
                yield prismaUser.$disconnect();
            }
        });
    }
}
exports.UserPrisma = UserPrisma;
