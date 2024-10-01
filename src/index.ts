import express from "express";

import { taskRouter } from "./routes/task.router";
import { userRouter } from "./routes/user.router";
import dotenv from "dotenv";
import path from "path";
import { swaggerRouter } from "./routes/swagger.route";

import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT_DEV || 3000;

app.use(cors());

app.use(express.json());

app.use(swaggerRouter);

app.use(userRouter);
app.use(taskRouter);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: http://localhost:${PORT}`);
    console.log(`Documentação na porta: http://localhost:${PORT}/api-docs`);
});

export default app;
