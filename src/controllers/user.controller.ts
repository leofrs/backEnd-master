import { Request, Response } from "express";
import { CreateUser, LoginUser } from "../../@types/user";
import { UserPrisma } from "../services/prismaUser.service";
import { comparePassword, hashPassword } from "../services/bcrypt.service";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../../@types/authUser";

const userPrisma = new UserPrisma();

export class UserController {
  async register(req: Request, res: Response) {
    const { name, email, password, confirmPassword } = req.body as CreateUser;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        error:
          "Um dos seguintes campos está faltando ser preenchido: nome, email, password ou confirmPassword",
      });
    }

    const existingUser = await userPrisma.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        error: "Usuário já cadastrado com esse email.",
      });
    }

    const cryptPassword = await hashPassword(password);
    const cryptConfirmPassword = await hashPassword(confirmPassword);

    await userPrisma
      .createUser({
        name,
        email,
        password: cryptPassword,
        confirmPassword: cryptConfirmPassword,
      })
      .then(() =>
        res.status(201).json({ message: "Usuário criado com sucesso" })
      )
      .catch((err) =>
        res.status(500).json({
          error: `Erro ao criar o usuário! ${err}`,
        })
      );
  }

  async login(req: AuthenticatedRequest, res: Response) {
    const { email, password } = req.body as LoginUser;
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

        return comparePassword(password, user.password);
      })
      .then((isPasswordValid) => {
        if (!isPasswordValid) {
          res.status(409).json({
            error: "Senha inválida.",
          });

          return Promise.reject();
        }

        const token = jwt.sign({ email }, process.env.SECRET_KEY!, {
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
  }
}
