import { Router } from "express";

import swaggerUI from "swagger-ui-express";
import { swaggerDocument } from "../swagger";

export const swaggerRouter = Router();

swaggerRouter.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerDocument)
);
