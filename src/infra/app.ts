import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";

import swaggerFile from "../../swagger.json";

import "./container";
import { DomainError } from "../domain/errors/DomainError";
import { router } from "../domain/routes/index";
import createConnection from "./database";

createConnection();

const app = express();
app.use(express.json());
app.use(router);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof DomainError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
