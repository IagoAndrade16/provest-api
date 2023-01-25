import express, { Request, Response } from "express";

import { router } from "../domain/routes/index";

const app = express();
app.use(express.json());
app.use(router);

export { app };
