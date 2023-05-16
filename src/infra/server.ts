import { app } from "./app";
import { AppDataSource } from "./database";

AppDataSource.initialize();

app.listen(3333, () => console.log("Running in port 3333"));
