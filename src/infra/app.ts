import express from "express";

import "reflect-metadata";
import "./container";
import { router } from "../domain/routes/index";
import createConnection from "./database";

createConnection();

const app = express();
app.use(express.json());
app.use(router);

export { app };
