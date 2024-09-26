import express from "express";

import swaggerUI from "swagger-ui-express";
import { swaggerDocument } from "./swagger";
import { taskRouter } from "./routes/task.router";
import { userRouter } from "./routes/user.router";

const app = express();
const PORT = process.env.PORT_DEV || 3000;

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(userRouter);
app.use(taskRouter);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: http://localhost:${PORT}`);
    console.log(`Documentação na porta: http://localhost:${PORT}/api-docs`);
});