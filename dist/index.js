"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./swagger");
const task_router_1 = require("./routes/task.router");
const user_router_1 = require("./routes/user.router");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT_DEV || 3000;
app.use(express_1.default.json());
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerDocument));
app.use(user_router_1.userRouter);
app.use(task_router_1.taskRouter);
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../index.html"));
});
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: http://localhost:${PORT}`);
    console.log(`Documentação na porta: http://localhost:${PORT}/api-docs`);
});
exports.default = app;
