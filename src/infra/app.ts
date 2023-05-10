import "reflect-metadata";
import { handleErrors } from "@errors/handleErrors";
import * as dotenv from "dotenv";
import express from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import "./container";

import swaggerFile from "../../swagger.json";
import { router } from "../domain/routes/index";

dotenv.config();

const app = express();
app.use(express.json());
app.use(router);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(handleErrors);

export { app };
