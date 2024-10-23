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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const prismaUser_service_1 = require("../services/prismaUser.service");
const bcrypt_service_1 = require("../services/bcrypt.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userPrisma = new prismaUser_service_1.UserPrisma();
class UserController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, confirmPassword } = req.body;
            if (!name || !email || !password || !confirmPassword) {
                return res.status(400).json({
                    error: "Um dos seguintes campos está faltando ser preenchido: nome, email, password ou confirmPassword",
                });
            }
            const existingUser = yield userPrisma.findByEmail(email);
            if (existingUser) {
                return res.status(409).json({
                    error: "Usuário já cadastrado com esse email.",
                });
            }
            const cryptPassword = yield (0, bcrypt_service_1.hashPassword)(password);
            const cryptConfirmPassword = yield (0, bcrypt_service_1.hashPassword)(confirmPassword);
            yield userPrisma
                .createUser({
                name,
                email,
                password: cryptPassword,
                confirmPassword: cryptConfirmPassword,
            })
                .then(() => res.status(201).json({ message: "Usuário criado com sucesso" }))
                .catch((err) => res.status(500).json({
                error: `Erro ao criar o usuário! ${err}`,
            }));
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    error: "Email e senha não passados.",
                });
            }
            userPrisma
                .findByEmail(email)
                .then((user) => {
                if (!user) {
                    res.status(401).json({
                        error: "Usuário não cadastrado/encontrado",
                    });
                    return Promise.reject();
                }
                return (0, bcrypt_service_1.comparePassword)(password, user.password);
            })
                .then((isPasswordValid) => {
                if (!isPasswordValid) {
                    res.status(409).json({
                        error: "Senha inválida.",
                    });
                    return Promise.reject();
                }
                const token = jsonwebtoken_1.default.sign({ email }, process.env.SECRET_KEY, {
                    expiresIn: "1h",
                });
                res.status(200).json({ token: token });
            })
                .catch((err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({
                        error: "Erro no processamento.",
                    });
                }
            });
        });
    }
}
exports.UserController = UserController;
